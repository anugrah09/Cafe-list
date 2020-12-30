// function rendercafe(doc){
//     console.log(doc.data());
// }

// db.collection('cafe').get().then((snapshot) => {
//     // console.log(snapshot.docs);
//     snapshot.docs.forEach(doc => {
//         rendercafe(doc);
//     });
// });
const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div')
    li.setAttribute('data-id', doc.id);
    // console.log(doc.data());
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);
    cross.addEventListener('click', (e)=>{
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafe').doc(id).delete(); //.doc() will find the document with given id
    })
}

// getting data
// db.collection('cafe').where('city', '==', 'london').get().then()  // query selector 1st argument field 2nd operation 3rd value  or > n
// db.collection('cafe').orderBy('name').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     });
// });
db.collection('cafe').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(element => {
        // console.log(element.type);
        if(element.type=='added'){
            renderCafe(element.doc)
        }
        else if(element.type=='removed'){
            let li = cafeList.querySelector('[data-id='+ element.doc.id +']');
            cafeList.removeChild(li);
        }
    });
    // console.log(changes.doc.data());/
});
//adding data
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    db.collection('cafe').add({
        name: form.name.value,
        city: form.city.value
    })
form.name.value =""
form.city.value =""
})