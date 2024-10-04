const rows =document.querySelectorAll('.row');

const getItemAt = (x,y) => rows[y - 1].children[x - 1];
const checkItemAt = (x,y) => getItemAt(x,y).checked = true;
const unCheckItemAt = (x,y) => getItemAt(x,y).checked = false;

const placeAppleAt = (x,y) =>{
	getItemAt(x,y).type = 'radio';
	checkItemAt(x,y);
}
const remoteAppleAt = (x,y) => {
	getItemAt(x,y).type = 'checkbox';
	unCheckItemAt(x,y);
}

const getApplePosition = () => {
	const position = [1,1];
	rows.forEach((row, rowIndex)=>{
		Array.from(row.children).forEach((input, inputIndex)=>{
			if(input.type == 'radio'){
				position[0] = inputIndex+1;
				position[1] = rowIndex+1;
			}
		});
	});
	return position;
}


const getRandomPosition = () =>{
	const availablePositions = [];
	rows.forEach((row, rowIndex)=>{
		Array.from(row.children).forEach((input,inputIndex)=>{
			if(input.type =='checkbox' && input.checked==false){
				availablePositions.push([inputIndex+1, rowIndex+1]);
			}
		});
	});
	const index = Math.floor(Math.random()*(availablePositions.length)-1)+1;
	return availablePositions[index];
}

const increaseScore = () =>{
	const score = document.querySelector('.score');

	currentScore = parseInt(score.innerText, 10);
	score.innerText = currentScore +1;
}

const handleInput = () => {
	document.addEventListener('keydown', e=>{
		switch(e.keyCode){

		case key.arrowUp: movingDirection = movingDirection ==='down'? 'down' : 'up'; break;
		case key.arrowDown: movingDirection = movingDirection ==='up'? 'up' : 'down'; break;
		case key.arrowLeft: movingDirection = movingDirection ==='right'? 'right' : 'left'; break;
		case key.arrowRight: movingDirection = movingDirection ==='left'? 'left' : 'right'; break;
		}

		if (moveInterval === undefined){
			moveInterval = setInterval(()=>{
				move(movingDirection|| 'left');
			}, 1000/speed);
		}
	});
}

const move = direction => {
	const applePosition = getApplePosition();
	const head = [...snake[0]];
	const tail = [...snake[snake.length - 1]];

	const updateSnake = () =>{
		snake.unshift(head);
		snake.pop();

		snake.forEach(snakePart => checkItemAt(...snakePart));
	}

	switch (direction){
	case 'up': head[1]= head[1] ===1?worldSize : head[1]-1; break;
	case 'down': head[1]= head[1] ===worldSize?1 : head[1]+1; break;	
	case 'left': head[0]= head[0] ===1?worldSize : head[0]-1; break;
	case 'right': head[0]= head[0] ===worldSize?1 : head[0]+1; break;	
	}
	if(getItemAt(...head).type === 'checkbox'&& getItemAt(...head).checked){
		document.querySelector('h1').innerText = 'Game Over';
		document.querySelectorAll('input').forEach(input => input.disabled=true);

		playWave(head);
		clearInterval(moveInterval);
	}

	if (head[0]===applePosition[0]&& head[1]===applePosition[1]){
		snake.push(tail);
		placeAppleAt(...getRandomPosition());
		remoteAppleAt(...applePosition);
		increaseScore();
		updateSnake();

	}
	else{
		updateSnake();
		unCheckItemAt(...tail);
	}
}
const playWave = head =>{
	const checkboxes = [];
	for(let x=1; x<=worldSize; x++){
		for(let y=1;y<=worldSize;y++){
			checkboxes.push(getItemAt(x,y));
		}
	}

	getItemAt(...head).className = 'wave';

	checkboxes.forEach((checkbox, index)=>{
		setTimeout(()=>{
			checkbox.className = 'wave';
			checkbox.checked = false;
		}, 10*index);
	});
}








/*
const rows = document.querySelectorAll('.row');

const getItemAt = (x,y) => rows[y - 1].children[x - 1];
const checkItemAt = (x,y) => getItemAt(x,y).checked = true;
const unCheckedItemAt = (x,y) => getItemAt(x,y).checked = false;

const placeAppleAt = (x,y) =>{
	getItemAt(x,y).type = 'radio';
	checkItemAt(x,y);
}
const remoteAppleAt = (x,y) => {
	getItemAt(x,y).type = 'checkbox';
	unCheckedItemAt(x,y);
}

const getApplePosition = () => {
	const position = [1,1];
	rows.forEach((row, rowIndex)=>{
		Array.from(row.children).forEach((input, inputIndex)=>{
			if(input.type == 'radio'){
				position[0] = inputIndex+1;
				position[1] = rowIndex+1;
			}
		});
	});
	return position;
}

const getRandompos = () => {
    const avaliblePos = [];
    rows.forEach((row, rowInd) => {
        Array.from(row.children).forEach((input, inputInd) => {
            if (input.type == 'checkbox' && input.checked == false) {
                avaliblePos.push([inputInd++, rowInd++]);
            }
        });
    })
    const index = Math.floor(Math.random() * (avaliblePos.length) - 1) + 1;
    return avaliblePos[index];
}

const increaseScore = () => {
    const score = document.querySelector('h1 span.score');
    let currentScore = parseInt(score.indexText, 10);
    score.innerHTML = currentScore+1;
    console.log('increaseScrore')
}

const handleInput = () => {
    document.addEventListener('keydown', e => {
        switch (e.keyCode) {
            case key.arrowUp: movingDir = movingDir === 'down' ? 'down' : 'up'; break;
            case key.arrowDown: movingDir = movingDir === 'up' ? 'up' : 'down'; break;
            case key.arrowLeft: movingDir = movingDir === 'right' ? 'right' : 'left'; break;
            case key.arrowRight: movingDir = movingDir === 'left' ? 'left' : 'right'; break;
        }
        if (moveInter === undefined) {
            moveInter = setInterval(() => {
                move(movingDir || 'left');
            }, 1000 / speed);
        }
    });
}

const move = direction => {
    const head = [...snake[0]];
    const tail = [...snake[snake.length -1]];

    const updateSnake = () => {
        snake.unshift(head);
        snake.pop();
        snake.forEach(snakePart => checkItemAt(...snakePart));
    }
    switch (direction) {
        case 'up': head[1] = head[1] === 1? worldSize : head[1] -1; break;
        case 'down': head[1] = head[1] === worldSize?1 : head[1] +1; break;
        case 'left': head[0] = head[0] === 1? worldSize : head[0] -1; break;
        case 'right': head[0] = head[0] === worldSize?1 : head[0] +1; break;
    }
    if(getItemAt(...head).type === 'checkbox'&& getItemAt(...head).checked){
		document.querySelector('h1').innerText = 'Game Over';
		document.querySelectorAll('input').forEach(input => input.disabled=true);

		playWave(head);
		clearInterval(moveInter);
	}

	if (head[0] === getApplePosition[0] && head[1] === getApplePosition[1]){
		snake.push(tail);
		plaxAppleAt(...getRandompos());
		remoteAppleAt(...getApplePosition());
		increaseScore();
		updateSnake();

	}
	else{
		updateSnake();
		unCheckedItemAt(...tail);
	}
}

const playWave = head => {
    const checkboxes = [];
    for (let x = 1; x <= worldSize; x++) {
        for (let y = 1; y <= worldSize; y++) {
            checkboxes.push(getItemAt(x, y))
        }
    }
    getItemAt(...head).className = 'wave'

    checkboxes.forEach(function (checkbox, index) {
        setTimeout(() => {
            checkbox.className = 'wave'
            checkbox.checked = false
        }, 10 * index)
    })
}
*/