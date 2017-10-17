// Функция-генератор алфавита (Unicode, только англ буквы)
const generateAlphabet = () => {
	let alphabet = {},
		iter = 0;
	for(let i = 32; i <= 127; i++){
		alphabet[iter] = String.fromCharCode(i);
		iter += 1;
	}
	return alphabet;
}

// Сопоставляем слово и алфавит, получаем коды букв слова
const encodeVal = (word) => {
	let listCode = [],
			len = word.length,
			alphabet = generateAlphabet();
	for(let i = 0; i <= len; i++){
		for (var val in alphabet) {
			if (word[i] == alphabet[val]) {
				listCode.push(val);
			}
		}
	}
	return listCode;
}

// Сопоставляем индексы ключа и строки
const comparator = (str, key) => {
	let keyLen = key.length,
			compared = {},
			iter = 0,
			full = 0;
		str.forEach(el => {
			compared[full] = [el, key[iter]];
			iter++;
			full++;
			if(iter >= keyLen) iter = 0;
		});
		return compared;
}

// Генерируем новую строку
const fullEncode = (str, key) => {
	let compared = comparator(str, key),
			newWord = [],
			alphabet = generateAlphabet();
	for (let el in compared) {
		let newChar = (compared[el][0] + compared[el][1]) % Object.keys(alphabet).length;
		newWord.push(newChar);
	}
	return newWord;
}

// Расшифровываем новую строку
const decodeNewVal = (arr) => {
	let chars = [],
			wordLen = arr.length,
			alphabet = generateAlphabet();
	// Получаем символы
	for (let i = 0; i < wordLen; i++) {
		for (var val in alphabet) {
			if (arr[i] == val) {
				chars.push(alphabet[val]);
			}
		}
	}
	return chars;
}
