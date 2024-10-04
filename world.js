const generateWorld = () => {
    for (let rowindex = 0; rowindex < worldSize; rowindex++) {
        const row = document.createElement('div');
        row.classList.add('row');

        for ( let columnindex = 0; columnindex < worldSize; columnindex++ ) {
            const input = document.createElement('input');
            input.type = 'checkbox';
            row.appendChild(input);
        }
        document.querySelector('.world').appendChild(row);
    }
}
generateWorld(worldSize);