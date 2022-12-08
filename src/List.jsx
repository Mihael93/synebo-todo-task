import React from 'react';
import edit from './images/icon-edit.svg';
import cross from './images/icon-cross.svg';

const List = ({ items, removeItem, editItem, addComplited }) => {

   return (
      <div className='todo-list'>
         {items.map((item) => {
            const { id, title, status } = item;

            return (
               <article key={id} className="list-item">
                  <div className={`${status ? 'item-title item-title-completed' : 'item-title'}`}>
                     <div className={`${status ? 'item-circle item-circle-completed' : 'item-circle'}`}
                        onClick={() => addComplited(id)}>
                     </div>
                     {title}
                  </div>
                  <div className="item-btn-container">
                     <button type='button' className='edit-btn' onClick={() => editItem(id)}>
                        <img src={edit} alt="edit" />
                     </button>
                     <button type='button' className='delete-btn' onClick={() => removeItem(id)}>
                        <img src={cross} alt="delete" />
                     </button>
                  </div>
               </article>
            )
         })}
      </div>
   );
}

export default List;