let input = null;
let allTasks = [];
let valueInput = '';
let isEdit = false;

const onClickButton = () => {
  if (!isEdit && valueInput!='') {
    allTasks.push({
      text: valueInput,
      isCheck: false 
    })
    valueInput = '';
    input.value = '';
    render();
  }
}

const updateValue = (event) => {
  valueInput = event.target.value;
}

const onChangeCheckbox = (index) => {
  allTasks[index].isCheck = !allTasks[index].isCheck;
  render();
}

const onClickImageDelete = (index) => {
  allTasks.splice(index,1);
  render();
}

const onClickImageEdit = (index) => {
  if (!allTasks[index].isCheck) {
    isEdit = true;
    render(index);
  }
}

const onClickImageOk = (text, index) => {
  allTasks[index].text = text;
  render();
}

const onClickImageCancel = () => {
  render();
}

const render = (editIndex) => {
  if (editIndex === undefined) {
    isEdit = false;
  }
  const content = document.getElementById('content-page');
  if (content.innerHTML != '') {
    content.innerHTML = '';
  }
  allTasks.sort((x, y) => {
    return Number(x.isCheck) - Number(y.isCheck)
  })
  
  allTasks.map((item, index) => {
    const conteiner = document.createElement('div');
    const checkbox = document.createElement('input');
    const imageOk = document.createElement('img');
    const imageCancel = document.createElement('img');
    const text = document.createElement('p');
    const imageEdit = document.createElement('img');
    const imageDelete = document.createElement('img');
    const edit = document.createElement('input');
    
    conteiner.id = `task - ${index}`;
    conteiner.classList = 'item';
    checkbox.type = 'checkbox';
    checkbox.checked = item.isCheck;

    checkbox.onchange = () => {
      onChangeCheckbox(index);
    }
    
    if (editIndex != undefined && editIndex === index) {
      edit.value  = allTasks[index].text;
      imageOk.src = 'img/ok.png';
      imageOk.className = 'icon';
      imageCancel.src = 'img/cancel.png';
      imageCancel.className = 'icon';
      conteiner.append(checkbox);
      conteiner.append(edit);
      conteiner.append(imageOk);
      conteiner.append(imageCancel);
      
      imageOk.onclick = () => {
        onClickImageOk(edit.value, index);
      }
      
      edit.onblur = () => {
        onClickImageOk(edit.value, index);
      }
      
      imageCancel.onclick = () => {
        onClickImageCancel();
      }
      
    } else {
      text.innerText = item.text;
      text.className = item.isCheck ? 'task-text done-text' : 'task-text';
      conteiner.appendChild(checkbox);
      conteiner.appendChild(text);
      imageEdit.src = 'img/edit.png';
      imageEdit.className = 'icon';
      conteiner.appendChild(imageEdit); 
      imageDelete.src = 'img/delete.png';
      imageDelete.className = 'icon';
      conteiner.appendChild(imageDelete); 
      
      imageDelete.onclick = () => {
        if(editIndex === undefined) {
          onClickImageDelete(index);
        }
      }
      
      imageEdit.onclick = () => {
        if(editIndex === undefined) {
          onClickImageEdit(index);
        }
      }
    } 
    content.appendChild(conteiner);
    edit.focus();
  });
}

window.onload =  init = () => {
  input = document.getElementById('add-task');
  input.focus();
  input.addEventListener("change", updateValue);
}