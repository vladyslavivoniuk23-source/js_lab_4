function generateArray(size) {
    return Array.from({length: size}, () => Math.floor(Math.random() * 500));
}

const baseArr = generateArray(100);

console.log("%c ТЕСТ 1: Нерозріджений масив (100 елементів) ");
MySortLib.bubbleSort([...baseArr]);
MySortLib.selectionSort([...baseArr]);
MySortLib.insertionSort([...baseArr]);
MySortLib.shellSort([...baseArr]);
MySortLib.quickSort([...baseArr]);

console.log("%c ТЕСТ 2: Розріджений масив (100 елементів) ", "background: #222; color: #ffcc00");

let sparseArr = generateArray(50);
sparseArr.length = 100; 

MySortLib.quickSort(sparseArr, true);
console.log("Вигляд масиву після сортування (undefined у кінці):", sparseArr);
