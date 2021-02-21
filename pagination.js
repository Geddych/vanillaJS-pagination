let data = []
const LIMIT = 50

window.onload = async () => {
    await fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json().then(res => data = res))
        countPages(data)
    
        data.slice(0,LIMIT).map(i => createRecord(i))
        
        
        sortTitleByDesc.onclick = SortTitleByDesc
        sortIdByDesc.onclick = SortidByDesc


}

idSearch.oninput = () => {
    
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild)
    }
    data.filter(i => String(i.id).match(new RegExp(idSearch.value,'gm'))).map(i => createRecord(i))
    countPages(data.filter(i => String(i.id).match(new RegExp(idSearch.value,'gm'))))
}
titleSearch.oninput = () => {
    
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild)
    }
    data.filter(i => i.title.match(new RegExp(titleSearch.value,'gm'))).map(i => createRecord(i))
    countPages(data.filter(i => i.title.match(new RegExp(titleSearch.value,'gm'))))
}

const countPages = (data) => {
    let count = Math.ceil(data.length / LIMIT)

    while (pagination.firstChild) {
        pagination.removeChild(pagination.firstChild)
    }

    for (let i = 1; i <= count; i++) {
        let li = document.createElement('li')
        li.innerHTML = i
        pagination.appendChild(li)
            
    }
    const pages = document.querySelectorAll('#pagination li')
    pages.forEach(p => {
        p.addEventListener('click',() => {
            
            if (document.querySelector('#pagination li.active')) {
                document.querySelector('#pagination li.active').classList.remove('active')
            }
            
            let numb = +p.innerHTML
            let start = (numb - 1) * LIMIT,
                end = start + LIMIT
            let notes = data.slice(start,end)
            tbody.innerHTML = '';
            notes.forEach(i => createRecord(i))
            p.classList.add('active')
            })
        })
        document.querySelector('#pagination').firstElementChild.classList.add('active')
}

const SortidByDesc = () => {

    data.sort((ob1,ob2) => {
        return ob2.id - ob1.id
    })

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild)
    }
    
    renderSorted()
    sortIdByDesc.remove()
    const butAsc = document.createElement('button')
    butAsc.innerText = 'Сортировать по возрастанию'
    butAsc.setAttribute('id','sortIdByAsc')
    idHeader.appendChild(butAsc)
    sortIdByAsc.onclick = SortidByAsc
}

const SortidByAsc = () => {

    data.sort((ob1,ob2) => {
        return ob1.id - ob2.id
    })

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild)
    }
    renderSorted()

    sortIdByAsc.remove()
    const butDesc = document.createElement('button')
    butDesc.innerText = 'Сортировать по Убыванию'
    butDesc.setAttribute('id','sortIdByDesc')
    idHeader.appendChild(butDesc)
    sortIdByDesc.onclick = SortidByDesc
}

const SortTitleByDesc = () => {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild)
    }
    data.sort(
        (ob1,ob2) => {
            let ob1Title =  ob1.title.toLowerCase(),
                ob2Title =  ob2.title.toLowerCase()
            return ob1Title > ob2Title? 1 :-1 
             
        }
    )
    renderSorted()
    sortTitleByDesc.remove()
    const butAsc = document.createElement('button')
    butAsc.innerText = 'Сортировать по убыванию'
    butAsc.setAttribute('id','sortTitleByAsc')
    titleHeader.appendChild(butAsc)
    sortTitleByAsc.onclick = SortTitleByAsc
}

const SortTitleByAsc = () => {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild)
    }
    data.sort(
        (ob1,ob2) => {
            let ob1Title =  ob1.title.toLowerCase(),
                ob2Title =  ob2.title.toLowerCase()
            return ob1Title > ob2Title? -1 : 1 
             
        }
    )
    renderSorted()
    sortTitleByAsc.remove()
    const butDesc = document.createElement('button')
    butDesc.innerText = 'Сортировать по алфавиту'
    butDesc.setAttribute('id','sortTitleByDesc')
    titleHeader.appendChild(butDesc)
    sortTitleByDesc.onclick = SortTitleByDesc
}


const renderSorted = () => {
    let numb = +document.querySelector('#pagination li.active').innerHTML
            let start = (numb - 1) * LIMIT,
                end = start + LIMIT
    data.slice(start,end).map(i => createRecord(i))
}



const createRecord = (data) => {
    
    const tr = document.createElement('tr')
    const tdId = document.createElement('td')
    const tdTitle = document.createElement('td')
    tdId.innerText = data.id
    tdTitle.innerText = data.title
    tr.appendChild(tdId)
    tr.appendChild(tdTitle)
    tr.classList.add('record')
    tbody.appendChild(tr)   
}