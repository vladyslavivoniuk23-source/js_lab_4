const SortLib = {
  
    printStats: function(methodName, comparisons, swaps, hasUndefined) {
        console.log(`--- ${methodName} ---`);
        console.log(`Порівнянь: ${comparisons}`);
        console.log(`Обмінів/Переміщень: ${swaps}`);
        if (hasUndefined) {
            console.log("Повідомлення: У масиві виявлено undefined-елементи. Їх переміщено в кінець.");
        }
    },

    
    preprocessArray: function(arr) {
        const clean = [];
        let undefinedCount = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === undefined) {
                undefinedCount++;
            } else {
                clean.push(arr[i]);
            }
        }
        return { clean, undefinedCount };
    },

    
    postprocessArray: function(originalArr, sortedClean, undefinedCount) {
        for (let i = 0; i < sortedClean.length; i++) originalArr[i] = sortedClean[i];
        for (let i = 0; i < undefinedCount; i++) originalArr[sortedClean.length + i] = undefined;
    },

    
    bubbleSort: function(arr, ascending = true) {
        let { clean, undefinedCount } = this.preprocessArray(arr);
        let n = clean.length;
        let comparisons = 0, swaps = 0;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                comparisons++;
                if (ascending ? clean[j] > clean[j + 1] : clean[j] < clean[j + 1]) {
                    [clean[j], clean[j + 1]] = [clean[j + 1], clean[j]];
                    swaps++;
                }
            }
        }
        this.postprocessArray(arr, clean, undefinedCount);
        this.printStats("Сортування обміном", comparisons, swaps, undefinedCount > 0);
    },

    
    selectionSort: function(arr, ascending = true) {
        let { clean, undefinedCount } = this.preprocessArray(arr);
        let n = clean.length;
        let comparisons = 0, swaps = 0;

        for (let i = 0; i < n - 1; i++) {
            let targetIdx = i;
            for (let j = i + 1; j < n; j++) {
                comparisons++;
                if (ascending ? clean[j] < clean[targetIdx] : clean[j] > clean[targetIdx]) {
                    targetIdx = j;
                }
            }
            if (targetIdx !== i) {
                [clean[i], clean[targetIdx]] = [clean[targetIdx], clean[i]];
                swaps++;
            }
        }
        this.postprocessArray(arr, clean, undefinedCount);
        this.printStats("Сортування мінімальних елементів", comparisons, swaps, undefinedCount > 0);
    },

   
    insertionSort: function(arr, ascending = true) {
        let { clean, undefinedCount } = this.preprocessArray(arr);
        let n = clean.length;
        let comparisons = 0, swaps = 0;

        for (let i = 1; i < n; i++) {
            let key = clean[i];
            let j = i - 1;
            while (j >= 0) {
                comparisons++;
                if (ascending ? clean[j] > key : clean[j] < key) {
                    clean[j + 1] = clean[j];
                    swaps++;
                    j--;
                } else break;
            }
            clean[j + 1] = key;
        }
        this.postprocessArray(arr, clean, undefinedCount);
        this.printStats("Сортування вставками", comparisons, swaps, undefinedCount > 0);
    },

   
    shellSort: function(arr, ascending = true) {
        let { clean, undefinedCount } = this.preprocessArray(arr);
        let n = clean.length;
        let comparisons = 0, swaps = 0;

        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                let temp = clean[i];
                let j = i;
                while (j >= gap) {
                    comparisons++;
                    if (ascending ? clean[j - gap] > temp : clean[j - gap] < temp) {
                        clean[j] = clean[j - gap];
                        swaps++;
                        j -= gap;
                    } else break;
                }
                clean[j] = temp;
            }
        }
        this.postprocessArray(arr, clean, undefinedCount);
        this.printStats("Сортування Шелла", comparisons, swaps, undefinedCount > 0);
    },

    
    quickSort: function(arr, ascending = true) {
        let { clean, undefinedCount } = this.preprocessArray(arr);
        let comparisons = 0, swaps = 0;

        const sort = (data, left, right) => {
            if (left >= right) return;
            let pivot = data[Math.floor((left + right) / 2)];
            let i = left, j = right;

            while (i <= j) {
                while (ascending ? data[i] < pivot : data[i] > pivot) { i++; comparisons++; }
                while (ascending ? data[j] > pivot : data[j] < pivot) { j--; comparisons++; }
                if (i <= j) {
                    [data[i], data[j]] = [data[j], data[i]];
                    swaps++;
                    i++; j--;
                }
            }
            sort(data, left, j);
            sort(data, i, right);
        };

        sort(clean, 0, clean.length - 1);
        this.postprocessArray(arr, clean, undefinedCount);
        this.printStats("Сортування Хоара (QuickSort)", comparisons, swaps, undefinedCount > 0);
    }
};
