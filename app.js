const isCyrrilic = (text) => /[\u0400-\u04FF]/.test(text);

$(document).ready(()=>{
  $('.decode').on('click', (e)=>{
    e.preventDefault();

    let defaultText = $('#vigenereFrom').val(),
        key = $('#vigenereKey').val();

    if(defaultText && key){
      // Проверка на кириллицу
      if(isCyrrilic(defaultText) || isCyrrilic(key)){
        alert('Кириллица не поддерживается');
        return 0;
      }
      // Если всё ок, то шифруем
      defaultText = encodeVal(defaultText);
      key = encodeVal(key);
      let codedPhrase = decodeNewVal(fullEncode(defaultText, key)).join('');
      // Выводим результат
      $('.result').show();
      $('.result').text(codedPhrase);
    } else{
      alert('Необходимо заполнить все поля')
    }
  })
});
