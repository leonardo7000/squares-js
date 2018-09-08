//когда страница загрузится полностью, запустится функция
window.onload = function () {
  //находим элементы таблицы
  var table = document.getElementById("myTable");
  //вешаю событие при наведении курсора на элемент таблицы
  table.onmouseover = function(e) {
	//выполняем все действия
	doAll(e);
  };
  
  table.onmouseout = function(e) {
    //document.getElementById('exemple1').style.display='none';
	if (e.fromElement.localName == 'td') {
		var coord = getCurrentCursorCoord(e);
		clearRemoveButtons(coord);
	}
	
  }

  
}

function doAll(e, action){
	// получаем координаты
	var coord = getCurrentCursorCoord(e);
	// показываем кнопки добавления
	showAddButtons(coord);
	// показываем кнопки удаления
	showRemoveButtons(coord);
	
	
}

function getCurrentCursorCoord(e){
	var coord = [];
	// находим элемент, на который наведена мышь
	var td = document.getElementById('myTable').querySelectorAll('td:hover');
	if(td.length == 1){
		coord[0] = td[0].parentElement.sectionRowIndex;
		coord[1] = td[0].cellIndex;
		return coord;
	}
}

function getTableRowsNum(){
	// находим все строки наблицы
	var rows = document.getElementById("myTable").getElementsByTagName('tr');
	return rowsNum = rows.length;
}

function getTableColumnsNum(){
	var rows = document.getElementById("myTable").getElementsByTagName('tr');
	// возвращаем все ячейки (колонки) таблицы 
	return rows[0].getElementsByTagName('td').length;
}

function addRow() {
    var table = document.getElementById("myTable");
	var colsHtml = '';
	var columnsNum = getTableColumnsNum();
	var row = table.insertRow();
	
	for(var i=0;i<columnsNum; i++){
		// создаю столько ячеек, сколько колонок в таблице
		colsHtml += '<td></td>';
	}
	row.innerHTML = colsHtml;
	
	// добавляем строки в таблицы, в которых отображаются кнопки добавления и удаления
	addRowToAuxiliaryTables('left');
	addRowToAuxiliaryTables('right');
	
	// add column to top and bottom tables
	function addRowToAuxiliaryTables(tableId){
		var table = document.getElementById(tableId);
		// вставляем строку, а в строку вставляем ячейку
		table.insertRow().insertCell();
	}
}

function addColumn(el){
	var rows = document.getElementById("myTable").getElementsByTagName('tr');
	for(var i=0; i< rows.length; i++){
		var row = rows[i];
		// в каждую строку вставляем по 1 ячейке
		row.insertCell()
	}
	
	// добавляем ячейку в строку таблиц, в которых отображаются кнопки добавления и удаления
	addColumnToAuxiliaryTables('top');
	addColumnToAuxiliaryTables('bottom');
	
	function addColumnToAuxiliaryTables(tableId){
		var tableRow = document.getElementById(tableId).getElementsByTagName('tr');
		tableRow[0].insertCell();
	}
}

function deleteColumn(columnIndex){
	var rows = document.getElementById("myTable").getElementsByTagName('tr');
	for(var i=0; i< rows.length; i++){
		var row = rows[i];
		row.deleteCell(columnIndex);
	}
	
	removeColumnFromAuxiliaryTables('top');
	removeColumnFromAuxiliaryTables('bottom');
	
	function removeColumnFromAuxiliaryTables(tableId){
		var tableRow = document.getElementById(tableId).getElementsByTagName('tr');
		tableRow[0].deleteCell(1);
	}
}

function deleteRow(rowIndex) {
    document.getElementById("myTable").deleteRow(rowIndex);
		
	removeRowFromAuxiliaryTables('left');
	removeRowFromAuxiliaryTables('right');
	
	function removeRowFromAuxiliaryTables(tableId){
		var table = document.getElementById(tableId);
		table.deleteRow(1);
	}
}

// ты сказал чтобы эту функцию я отключил
function showAddButtons(coord){
	if(false && coord != null && coord != undefined && coord.length == 2){
		var rowIndex = coord[0];
		var cellIndex = coord[1];
		
		var buttonsPlus = document.getElementsByClassName('btn_plus');
		var btnNums = buttonsPlus.length;
		console.log('btns: ' + btnNums);
		for(var i=0; i<=btnNums; i++){
			console.log('i: ' + i + ' | ' + 'btn: ' + buttonsPlus[i]);
			
			if(buttonsPlus[i] != null){
				buttonsPlus[i].remove();
			}
			
		}
		
		if(rowIndex != undefined && cellIndex != undefined){
			console.log('rowIndex: '+ rowIndex);
			var cell = document.getElementById('right').getElementsByTagName('tr')[rowIndex].cells[0];
			console.log(cell);
			cell.innerHTML = '<button class="btn_plus" onclick="addColumn(this)">+</button>';
			
			var cell = document.getElementById('bottom').getElementsByTagName('tr')[0].cells[cellIndex];
			cell.innerHTML = '<button class="btn_plus" onclick="addRow(this)">+</button>';
		}
	}
}

// отображает кнопки удаления. Функция принимает координаты
function showRemoveButtons(coord){
	if(coord != null && coord != undefined && coord.length == 2){
		var rowIndex = coord[0];
		var cellIndex = coord[1];
		
		// получаем все кнопки удаления
		var buttons = document.getElementsByClassName('btn_minus');
		// определяем количество кнопок (на всякий случай)
		var btnNums = buttons.length;
		for(var i=0; i<=btnNums; i++){
			// если элемент (кнопка) существует - удаляем её
			if(buttons[i] != null){
				buttons[i].remove();
			}
		}
		for(var i=0; i<=btnNums; i++){
			// если элемент (кнопка) существует - удаляем её
			if(buttons[i] != null){
				buttons[i].remove();
			}
		}
		
		
		if(rowIndex != undefined && cellIndex != undefined){
			// добавляем строку в таблицу слева
			var cell = document.getElementById('left').getElementsByTagName('tr')[rowIndex].cells[0];
			cell.innerHTML = '<button class="btn_minus" onclick="deleteRow('+ rowIndex +')">-</button>';
			// добавляем ячейку в таблицу сверху
			var cell = document.getElementById('top').getElementsByTagName('tr')[0].cells[cellIndex];
			cell.innerHTML = '<button class="btn_minus" onclick="deleteColumn('+ cellIndex +')">-</button>';
		}
	}
}
function clearAddButtons(coord){
	
}
function clearRemoveButtons(coord){
	var rowIndex = coord[0];
	var cellIndex = coord[1];
	
	// получаем все кнопки удаления
	var buttons = document.getElementsByClassName('btn_minus');
	// определяем количество кнопок (на всякий случай)
	var btnNums = buttons.length;
	console.log('btns: ' + btnNums);
	for(var i=0; i<=btnNums; i++){
		// если элемент (кнопка) существует - удаляем её
		if(buttons[i] != null){
			buttons[i].remove();
		}
	}
}