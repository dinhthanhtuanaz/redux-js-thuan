console.log(window.Redux);

const { createStore } = window.Redux;

// SETUP REDUX STORE
// state
// reducer
// store
// const initState = [
//     'List to music'
// ];
const initState = JSON.parse(localStorage.getItem('hobby_list')) || [];
//Khởi tạo Reducer ban đầu
// const hobbyReducer = (state = initState, action) => {
//     return state;
// }

// Fix lại Reducer
const hobbyReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_HOBBY': {
            const newList = [...state];
            newList.push(action.payload);
            return newList;
        }
        default:
            return state;
    }
}

const store = createStore(hobbyReducer);

// -----------

// RENDER REDUX HOBBY LIST
const renderHobbyList = (hobbyList) => {
    if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;

    const ulElement = document.querySelector('#hobbyListId');
    if (!ulElement) return;

    //reset previous content of ul
    ulElement.innerHTML = '';
    for (const hobby of hobbyList) {
        const liElement = document.createElement('li');
        liElement.textContent = hobby;

        ulElement.appendChild(liElement);
    }
}

// RENDER INITIAL HOBBY LIST
const initialHobbyList = store.getState();
renderHobbyList(initialHobbyList);

// HANDLE FORM SUBMIT
const hobbyFormElement = document.querySelector('#hobbyFormId');
if (hobbyFormElement) {
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const hobbyTextElement = hobbyFormElement.querySelector('#hobbyTextId');
        if (!hobbyTextElement) return;
        console.log('SUBMIT', hobbyTextElement.value);

        const action = {
            type: 'ADD_HOBBY',
            payload: hobbyTextElement.value
        };
        store.dispatch(action); // đẩy qua Reducer để xử lý

        //reset form
        hobbyFormElement.reset();
    }

    hobbyFormElement.addEventListener('submit', handleFormSubmit);
}

//Khi state thay đổi thì chạy vào đây
store.subscribe(() => {
    console.log('STATE UPDATE: ', store.getState());
    const newHobbyList = store.getState();
    renderHobbyList(newHobbyList);

    // Lưu vào LocalStorage
    localStorage.setItem('hobby_list', JSON.stringify(newHobbyList));
});