// Simple local prototype logic
const sampleQCP = {
  id: 'QCP-1',
  drawing: 'DRW-100 rev2',
  points: [
    {id:'MP1', name:'Diameter A', nominal:10.0, tol:0.2},
    {id:'MP2', name:'Length B', nominal:50.0, tol:0.5},
    {id:'MP3', name:'Depth C', nominal:5.0, tol:0.1}
  ]
}

// Persisted inspections
const storageKey = 'qc_prototype_inspections'
function loadInspections(){ return JSON.parse(localStorage.getItem(storageKey) || '[]') }
function saveInspections(arr){ localStorage.setItem(storageKey, JSON.stringify(arr)) }

function navTo(page){
  if(page === 'dashboard') renderDashboard()
  if(page === 'inspect') renderInspection()
  if(page === 'qcp') renderQCPManager()
}

document.getElementById('nav-dashboard').addEventListener('click', ()=>navTo('dashboard'))
document.getElementById('nav-inspection').addEventListener('click', ()=>navTo('inspect'))
document.getElementById('nav-qcp').addEventListener('click', ()=>navTo('qcp'))

// Dashboard
function renderDashboard(){
  const app = document.getElementById('app')
  const inspections = loadInspections()
  const openNC = inspections.filter(i=>i.result === 'FAIL').length
  app.innerHTML = `
    <div class="card">
      <h2>Dashboard</h2>
      <p class="small">Open non-conformances: <strong>${openNC}</strong></p>
      <p class="small">Totale inspecties: <strong>${inspections.length}</strong></p>
    </div>
    <div class="card">
      <h3>Recente inspecties</h3>
      <table class="table">
        <tr><th>ID</th><th>QCP</th><th>Result</th><th>Door</th><th>Tijd</th></tr>
        ${inspections.slice().reverse().map(i=>`<tr><td>${i.id}</td><td>${i.qcpId}</td><td>${i.result}</td><td>${i.user||'-'}</td><td>${new Date(i.ts).toLocaleString()}</td></tr>`).join('')}
      </table>
    </div>
  `
}

// Inspection
function renderInspection(){
  const app = document.getElementById('app')
  const pointsHtml = sampleQCP.points.map(p=>`
    <tr>
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.nominal}</td>
      <td>±${p.tol}</td>
      <td>
        <div style="display:flex;gap:8px;align-items:center">
          <input class="input-number" data-point="${p.id}" type="number" step="0.01" placeholder="Enkele waarde" />
          <button class="button" data-batch-toggle="${p.id}">Batch</button>
        </div>
        <div class="batch-area" id="batch-${p.id}" style="display:none;margin-top:8px">
          <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px">
            <label class="small">Samples:</label>
            <input type="number" min="1" max="20" value="5" data-batch-count="${p.id}" style="width:70px;padding:4px;border-radius:4px;border:1px solid #ddd"/>
            <button class="button" data-batch-reset="${p.id}">Clear</button>
          </div>
          <div class="batch-grid" data-batch-grid="${p.id}" style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px"></div>
          <div class="small">Stats: <span data-batch-stats="${p.id}">n/a</span></div>
        </div>
      </td>
      <td class="status" data-status-for="${p.id}">-</td>
    </tr>`).join('')

  app.innerHTML = `
    <div class="card">
      <h2>Nieuwe Inspectie</h2>
      <div class="small">QCP: <strong>${sampleQCP.id}</strong> &nbsp; Tekening: ${sampleQCP.drawing}</div>
    </div>
    <div class="card">
      <table class="table">
        <tr><th>#</th><th>Meetpunt</th><th>Nominal</th><th>Tolerance</th><th>Waarde (en batch)</th><th>Status</th></tr>
        ${pointsHtml}
      </table>
      <div style="margin-top:12px">
        <button id="btn-calc" class="button btn-primary">Controleer & Finaliseer</button>
        <button id="btn-save" class="button">Opslaan als draft</button>
      </div>
      <div id="inspection-result" style="margin-top:10px"></div>
    </div>
  `

  // attach batch controls
  sampleQCP.points.forEach(p=>{
    const btn = document.querySelector(`[data-batch-toggle="${p.id}"]`)
    const area = document.getElementById(`batch-${p.id}`)
    const countInput = document.querySelector(`[data-batch-count="${p.id}"]`)
    const grid = document.querySelector(`[data-batch-grid="${p.id}"]`)
    const statsEl = document.querySelector(`[data-batch-stats="${p.id}"]`)

    function renderGrid(count){
      grid.innerHTML = ''
      for(let i=0;i<count;i++){
        const inp = document.createElement('input')
        inp.type='number'; inp.step='0.01'; inp.setAttribute('data-batch-input', p.id); inp.setAttribute('data-batch-index', i)
        inp.className='input-number'
        inp.addEventListener('input', updateStats)
        inp.addEventListener('paste', onPasteToGrid)
        grid.appendChild(inp)
      }
      updateStats()
    }

    function getGridValues(){
      const inputs = Array.from(document.querySelectorAll(`[data-batch-input="${p.id}"]`))
      return inputs.map(i=>parseFloat(i.value)).filter(v=>Number.isFinite(v))
    }

    function updateStats(){
      const vals = getGridValues()
      if(vals.length===0){ statsEl.textContent='n/a'; return }
      const min = Math.min(...vals), max=Math.max(...vals)
      const mean = (vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(3)
      statsEl.textContent = `${vals.length} waarden, min ${min}, max ${max}, avg ${mean}`
    }

    function onPasteToGrid(e){
      // handle paste: parse clipboard and distribute across inputs
      const text = (e.clipboardData || window.clipboardData).getData('text')
      const vals = parseBatchValues(text)
      if(vals.length===0) return
      const inputs = Array.from(document.querySelectorAll(`[data-batch-input="${p.id}"]`))
      for(let i=0;i<inputs.length;i++){
        inputs[i].value = vals[i] !== undefined ? vals[i] : ''
      }
      updateStats()
      e.preventDefault()
    }

    if(btn){
      btn.addEventListener('click', ()=>{
        area.style.display = area.style.display === 'none' ? 'block' : 'none'
      })
    }
    if(countInput && grid){
      countInput.addEventListener('change', ()=>{ let v = parseInt(countInput.value)||1; if(v<1) v=1; if(v>20) v=20; countInput.value=v; renderGrid(v) })
      // initial render
      renderGrid(parseInt(countInput.value)||5)
    }

    // clear button
    const clearBtn = document.querySelector(`[data-batch-reset="${p.id}"]`)
    if(clearBtn){ clearBtn.addEventListener('click', ()=>{ const inputs = Array.from(document.querySelectorAll(`[data-batch-input="${p.id}"]`)); inputs.forEach(i=>i.value=''); updateStats() }) }

  })

  document.getElementById('btn-calc').addEventListener('click', finalizeInspection)
  document.getElementById('btn-save').addEventListener('click', saveDraft)
}

function parseBatchValues(text){
  if(!text) return []
  return text.split(/[,\n]/).map(s=>s.trim()).filter(s=>s!=='').map(s=>parseFloat(s)).filter(v=>Number.isFinite(v))
}

function getBatchValues(pId){
  const inputs = Array.from(document.querySelectorAll(`[data-batch-input="${pId}"]`))
  return inputs.map(i=>parseFloat(i.value)).filter(v=>Number.isFinite(v))
}

function finalizeInspection(){
  const results = []
  let overall = 'PASS'

  sampleQCP.points.forEach(p=>{
    const statusEl = document.querySelector(`[data-status-for="${p.id}"]`)
    const singleEl = document.querySelector(`input[data-point="${p.id}"]`)

    const batchVals = getBatchValues(p.id)
    if(batchVals.length > 0){
      // validate count
      if(batchVals.length < 1){
        statusEl.textContent = 'MISSING'; statusEl.className='status'
        overall = 'FAIL'
        results.push({id:p.id, values:[], ok:false, reason:'missing'})
        return
      }

      // compute per-sample check
      const checks = batchVals.map(v=> Math.abs(v - p.nominal) <= p.tol + 1e-9 )
      const failCount = checks.filter(c=>!c).length
      const ok = failCount === 0
      statusEl.textContent = ok ? `PASS (${batchVals.length})` : `FAIL (${failCount}/${batchVals.length})`
      statusEl.className = ok ? 'status status-pass' : 'status status-fail'
      if(!ok) overall = 'FAIL'
      const min = Math.min(...batchVals), max = Math.max(...batchVals)
      const mean = (batchVals.reduce((a,b)=>a+b,0)/batchVals.length).toFixed(3)
      results.push({id:p.id, values:batchVals, ok, stats:{count:batchVals.length,min,max,mean}})

    } else {
      // fallback to single value
      const val = parseFloat(singleEl.value)
      if(Number.isFinite(val)){
        const ok = Math.abs(val - p.nominal) <= p.tol + 1e-9
        statusEl.textContent = ok ? 'PASS' : 'FAIL'
        statusEl.className = ok ? 'status status-pass' : 'status status-fail'
        if(!ok) overall = 'FAIL'
        results.push({id:p.id, values:[val], ok})
      } else {
        statusEl.textContent = 'MISSING'; statusEl.className='status'
        overall = 'FAIL'
        results.push({id:p.id, values:[], ok:false, reason:'missing'})
      }
    }
  })

  const out = document.getElementById('inspection-result')
  out.innerHTML = `<div class="small">Resultaat: <strong class="${overall==='PASS'?'status-pass':'status-fail'}">${overall}</strong></div>`

  // save inspection
  const inspections = loadInspections()
  const insp = { id: 'INSP-'+(inspections.length+1), qcpId: sampleQCP.id, ts: Date.now(), result: overall, values: results }
  inspections.push(insp)
  saveInspections(inspections)

  if(overall === 'FAIL'){
    out.innerHTML += `<div style="margin-top:8px"><button id="btn-nc" class="button btn-danger">Maak Non-Conformance</button></div>`
    document.getElementById('btn-nc').addEventListener('click', ()=>createNC(insp))
  }
}

function saveDraft(){
  alert('Draft opgeslagen (voor prototype-simulatie).')
}

function createNC(insp){
  const nc = { id: 'NC-'+Date.now(), inspectionId: insp.id, status: 'OPEN', ts: Date.now() }
  const ncs = JSON.parse(localStorage.getItem('qc_prototype_ncs')||'[]')
  ncs.push(nc)
  localStorage.setItem('qc_prototype_ncs', JSON.stringify(ncs))
  alert('Non-conformance aangemaakt: '+nc.id)
  renderDashboard()
}

// QCP Manager
function renderQCPManager(){
  const app = document.getElementById('app')
  app.innerHTML = `
    <div class="card">
      <h2>QCP Manager</h2>
      <div class="small">QCP ID: <strong>${sampleQCP.id}</strong> &nbsp; Tekening: ${sampleQCP.drawing}</div>
    </div>
    <div class="card">
      <h3>Meetpunten</h3>
      <table class="table">
        <tr><th>ID</th><th>Naam</th><th>Nominal</th><th>Tolerance</th></tr>
        ${sampleQCP.points.map(p=>`<tr><td>${p.id}</td><td>${p.name}</td><td>${p.nominal}</td><td>±${p.tol}</td></tr>`).join('')}
      </table>
    </div>
  `
}

// initial
renderDashboard()