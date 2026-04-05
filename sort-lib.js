const SortLib = {
    // Допоміжний метод для виведення статистики
    _printStats: function(name, comparisons, swaps, hasSparse) {
        console.log(`--- ${name} ---`);
        console.log(`Порівнянь: ${comparisons}`);
        console.log(`Обмінів/Переміщень: ${swaps}`);
        if (hasSparse) {
            console.warn("Попередження: Масив містив undefined елементи.");
        }
    },

    // Перевірка на undefined для розріджених масивів
    _isSparse: function(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (!(i in arr) || arr[i] === undefined) return true;
        }
        return false;
    },

    // Метод обміну (Bubble Sort)
    bubbleSort: function(inputArr, ascending = true) {
        let arr = [...inputArr];
        let n = arr.length;
        let comp = 0, swaps = 0;
        let hasSparse = this._isSparse(arr);

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                comp++;
                let shouldSwap = ascending ? (arr[j] > arr[j + 1] || arr[j] === undefined) : (arr[j] < arr[j + 1] || arr[j + 1] === undefined);
                
                if (shouldSwap && arr[j+1] !== undefined) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    swaps++;
                }
            }
        }
        this._printStats("Сортування обміном", comp, swaps, hasSparse);
        return arr;
    },

    // Метод мінімальних елементів (Selection Sort)
    selectionSort: function(inputArr, ascending = true) {
        let arr = [...inputArr];
        let n = arr.length;
        let comp = 0, swaps = 0;
        let hasSparse = this._isSparse(arr);

        for (let i = 0; i < n - 1; i++) {
            let idx = i;
            for (let j = i + 1; j < n; j++) {
                comp++;
                let condition = ascending ? (arr[j] < arr[idx]) : (arr[j] > arr[idx]);
                if (arr[idx] === undefined || (arr[j] !== undefined && condition)) {
                    idx = j;
                }
            }
            if (idx !== i) {
                [arr[i], arr[idx]] = [arr[idx], arr[i]];
                swaps++;
            }
        }
        this._printStats("Сортування вибором", comp, swaps, hasSparse);
        return arr;
    },

    // Метод вставок (Insertion Sort)
    insertionSort: function(inputArr, ascending = true) {
        let arr = [...inputArr];
        let comp = 0, swaps = 0;
        let hasSparse = this._isSparse(arr);

        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0) {
                comp++;
                let condition = ascending ? (arr[j] > key) : (arr[j] < key);
                if (key !== undefined && (arr[j] === undefined || condition)) {
                    arr[j + 1] = arr[j];
                    j--;
                    swaps++;
                } else break;
            }
            arr[j + 1] = key;
        }
        this._printStats("Сортування вставками", comp, swaps, hasSparse);
        return arr;
    },

    // Метод Шелла
    shellSort: function(inputArr, ascending = true) {
        let arr = [...inputArr];
        let n = arr.length;
        let comp = 0, swaps = 0;
        let hasSparse = this._isSparse(arr);

        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                let temp = arr[i];
                let j = i;
                while (j >= gap) {
                    comp++;
                    let condition = ascending ? (arr[j - gap] > temp) : (arr[j - gap] < temp);
                    if (temp !== undefined && (arr[j - gap] === undefined || condition)) {
                        arr[j] = arr[j - gap];
                        j -= gap;
                        swaps++;
                    } else break;
                }
                arr[j] = temp;
            }
        }
        this._printStats("Сортування Шелла", comp, swaps, hasSparse);
        return arr;
    },

    // Метод Хоара (Quick Sort)
    quickSort: function(inputArr, ascending = true) {
        let arr = [...inputArr];
        let comp = 0, swaps = 0;
        let hasSparse = this._isSparse(arr);

        const sort = (low, high) => {
            if (low < high) {
                let pivotIdx = partition(low, high);
                sort(low, pivotIdx);
                sort(pivotIdx + 1, high);
            }
        };

        const partition = (low, high) => {
            let pivot = arr[Math.floor((low + high) / 2)];
            let i = low - 1;
            let j = high + 1;
            while (true) {
                do { i++; comp++; } while (ascending ? (arr[i] < pivot) : (arr[i] > pivot && arr[i] !== undefined));
                do { j--; comp++; } while (ascending ? (arr[j] > pivot) : (arr[j] < pivot && arr[j] !== undefined));
                if (i >= j) return j;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                swaps++;
            }
        };

        sort(0, arr.length - 1);
        this._printStats("Сортування Хоара", comp, swaps, hasSparse);
        return arr;
    }
};