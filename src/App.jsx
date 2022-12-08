import { useEffect, useState } from 'react';
import Alert from './Alert';
import moon from './images/icon-moon.svg';
import List from './List';

const getLocalStorage = () => {
   let list = localStorage.getItem('list');
   if (list) {
      return JSON.parse(localStorage.getItem('list'));
   } else {
      return [];
   }
};

function App() {

   const [name, setName] = useState('');
   const [list, setList] = useState(getLocalStorage());
   const [isEditing, setIsEditing] = useState(false);
   const [editId, setEditId] = useState(null);
   const [doneList, setDoneList] = useState([]);
   const [filtered, setFiltered] = useState(list);
   const [alert, setAlert] = useState({ show: false, msg: '', type: '' });


   const handleNameChange = (e) => {
      setName(e.target.value);
   };

   // number of items ?
   const es = () => {
      if (list.length > 1 || list.length === 0) {
         return "s";
      } else {
         return ''
      }
   };

   // functionality
   const handleSubmit = (e) => {
      e.preventDefault();
      if (!name) {
         showAlert(true, 'danger', 'please enter value');
      } else if (name && isEditing) {
         setList(list.map((item) => {
            if (item.id === editId) {
               return { ...item, title: name }
            }
            return item;
         }))
         setName('');
         setEditId(null);
         setIsEditing(false);
         showAlert(true, 'succes', 'value changed');
      } else {
         showAlert(true, 'succes', 'item added to the list');
         const newItem = { id: new Date().getTime().toString(), title: name, status: false };
         setList([...list, newItem]);
         setName('');
      }
   };

   const showAlert = (show = false, type = "", msg = "") => {
      setAlert({ show, type, msg });
   };

   // done list logick
   const addComplited = (id) => {
      const completedItem = list.find((item) => item.id === id);
      if (completedItem.status === false) {
         showAlert(true, 'succes', 'task completed');
         completedItem.status = true;
         setDoneList([...doneList, completedItem]);
      } else {
         showAlert(true, 'danger', 'task uncompleted');
         completedItem.status = false;
         const separated = doneList.map((item) => item.id !== id)
         setDoneList(separated);
      }
   };

   const clearComplited = () => {
      showAlert(true, 'danger', 'completed tasks are cleared');
      setList(list.filter((item) => item.status === false));
      setDoneList([]);
   };

   // item operations
   const removeItem = (id) => {
      showAlert(true, 'danger', 'item removed');
      setList(list.filter((item) => item.id !== id));
   };

   const editItem = (id) => {
      const specificItem = list.find((item) => item.id === id);
      setIsEditing(true);
      setEditId(id);
      setName(specificItem.title);
   };

   // filtration
   const handleFilter = (status) => {
      if (status === 'all') {
         setFiltered(list);
      } else {
         let newList = [...list].filter((item) => item.status === status)
         setFiltered(newList);
      }
   };

   useEffect(() => {
      setFiltered(list);
   }, [list]);

   // update local storage
   useEffect(() => {
      localStorage.setItem('list', JSON.stringify(list));
   }, [list, doneList]);

   return (
      <section className="section-center">

         {/* heading */}
         <div className="section__heading">
            <h2>todo</h2>
            <img src={moon} alt="logo" />
         </div>

         {/* alert */}
         {alert.show && <Alert {...alert} removeAlert={showAlert} />}

         {/* form */}
         <form className='section__form' onSubmit={handleSubmit}>
            <input type="text" className='form-input' placeholder='Create a new todo...'
               value={name} onChange={handleNameChange} />
            <button type='submit' className='form-submit-btn'>
               {isEditing ? 'edit' : 'submit'}
            </button>
         </form>

         {/* list */}
         {list.length > 0 &&
            <div className="section__container">
               <List items={filtered} removeItem={removeItem} editItem={editItem}
                  addComplited={addComplited} />
            </div>}

         {/* footer */}
         <div className="section__footer">
            <div className="section-tools">
               <div className="tools-info">{list.length} item{es()} left</div>
               <button className='tools-clear' onClick={clearComplited}>clear completed</button>
            </div>
            <div className="tools-buttons">
               <button className='button-all' onClick={() => handleFilter('all')}>all</button>
               <button className='button-active' onClick={() => handleFilter(false)}>active</button>
               <button className='button-completed' onClick={() => handleFilter(true)}>complited</button>
            </div>
         </div>

      </section >
   );
}

export default App;