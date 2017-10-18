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
		for (let val in alphabet) {
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
			iter += 1;
			full += 1;
			if(iter >= keyLen) iter = 0;
		});
		return compared;
}

// Генерируем новую строку
const fullEncode = (str, key) => {
	let compared = comparator(encodeVal(str), encodeVal(key)),
			newWord = [],
			alphabet = generateAlphabet();
	for (let el in compared) {
		let newChar = (+compared[el][0] + +compared[el][1]) % Object.keys(alphabet).length;
		newWord.push(newChar);
	}
	return decodeNewVal(newWord);
}

// Расшифровываем новую строку
const decodeNewVal = (arr) => {
	let chars = [],
			wordLen = arr.length,
			alphabet = generateAlphabet();
	// Получаем символы
	for (let i = 0; i < wordLen; i++) {
		for (let val in alphabet) {
			if (arr[i] == val) {
				chars.push(alphabet[val]);
			}
		}
	}
	return chars.join('');
}

// Декодируем
const fullDecode = (str, key) => {
	let compared = comparator(encodeVal(str), encodeVal(key)),
			alphabet = generateAlphabet(),
			decoded = [];
	let alphabetLength = Object.keys(alphabet).length
	for (let el in compared) {
		let decodedChar = (compared[el][0] - compared[el][1] + alphabetLength) % alphabetLength;
		decoded.push(decodedChar);
	}
	return(decodeNewVal(decoded));
}

// Пример изспользования
console.log('Кодируем слова "Information Security" по ключу "RANEPA"');
let result = fullEncode("Information Security", "RANEPA");
console.log("Результат:", result);
let decodedResult = fullDecode(result, "RANEPA");
console.log("Декодируем:", decodedResult);
