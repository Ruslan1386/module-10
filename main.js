/*
  Создать компонент счетчика времени.
  
  Простой прямоугольник который показывает время
  со старта упражения и до того момента когда все
  клавиши были верно нажаты.
  
  На входе есть строка символов для упражнения.
  
  Написать метод countKPS() который,по окончанию упражнения,
  возвращает кол-во верных клавишь в секунду которое было нажато за
  время выполнения упражнения.
  
  Записать результат в localStorage, но только в том случае если
  он лучше чем тот что уже есть в localStorage.
  
  При повторном посещении страницы надо брать то что записано
  в localStorage и вешать на страницу, это будет компонент
  лучшего результата.
  */

// дается строка и от первого нажатия до посленего
// правильного набранного знака считать время
const lang = "qwerty";
const string = "qryte";
const charsArr = string.split("").reverse();
const timerOutput = document.querySelector(".timer");
console.log(charsArr);

const timer = {
  bestResult: "",
  result: 0,
  number: null,
  id: ""
}

function startTimer() {
  alert("Start game");
  let time = 0;
  timer.id = setInterval(() => {
   time++;
   timerOutput.textContent = time;
 },1000); 
}

const countKPS = event => {  
  for (let index = 0; index < charsArr.length; index++){ 
    if (timer.number >= 0 && timer.number < charsArr.length){
      if(event.key == charsArr[index]){
        timer.number = timer.number + 1;
        delete charsArr[index];       
      } else {
        timer.number = timer.number + 0;        
      };
      console.log(timer.number);
    } else {
      clearInterval(timer.id);
      document.querySelector("#result").textContent = timerOutput.textContent;
      memory();
    };                 
  };  
};
const memory = () => {
  document.querySelector("#best-result").innerHTML = localStorage.getItem("best");
}
const saveMemory = () => {
  timer.bestResult = timerOutput.textContent;
  localStorage.setItem("best", timer.bestResult); 
  memory();      
}

memory();


document.querySelector("#start").addEventListener("click", startTimer);
window.addEventListener("keydown", countKPS);