const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let secretNumber = Math.trunc(Math.random() * 1000) + 1;
let lowerBound = 0;
let upperBound = 1000;
console.log(secretNumber);
const lowNumber = $('.game__low-number');
const highNumber = $('.game__high-number');
const guessNumber = $('.game__cur-number');
const checkBtn = $('.game__check');
const againBTn = $('.game__again');
const boardColor = $('.board-color');
const containerBoardColor = $('.board-color__container');
const listColorItems = $$('.board-color__item');
let feedbackMessage = document.createElement('div'); 
lowNumber.innerText = lowerBound;
highNumber.innerText = upperBound;
const checkNumber = function () {
  const guess = Number(guessNumber.value);
  if (Number.isNaN(guess)) { 
    displayFeedback("Vui lòng nhập số hợp lệ!", "red");
    guessNumber.value = '';
  }else{
  if (guess === secretNumber) {
    checkBtn.classList.add('none');
    againBTn.classList.remove('none');
    boardColor.classList.add('show');
    containerBoardColor.classList.add('show');
    if (feedbackMessage) feedbackMessage.remove();
  } else if (guess < secretNumber) {
    lowNumber.innerText = guess;
    guessNumber.value = '';
    lowNumber.classList.add('animate__fadeInTopLeft');
    displayFeedback("Liu liu sai rồi :(", "red");
  } else {
    highNumber.innerText = guess;
    guessNumber.value = '';
    highNumber.classList.add('animate__fadeInTopRight');
    displayFeedback("Liu liu sai rồi :(", "red");
  }
}
};
function displayFeedback(message, color) {
  if (!feedbackMessage.parentNode) {
    feedbackMessage = document.createElement('div'); 
  }
  feedbackMessage.className = 'feedback-message';
  feedbackMessage.textContent = message;
  // màu chữ sẽ lấy theo class, nếu muốn override thì dùng style.color = color
  if (color) feedbackMessage.style.color = color;
  if (!document.body.contains(feedbackMessage)) {
    document.body.appendChild(feedbackMessage);
  }
  feedbackMessage.style.opacity = '1';
  setTimeout(() => {
    feedbackMessage.style.opacity = '0'; 
  }, 5000);
  setTimeout(() => {
    if (document.body.contains(feedbackMessage)) {
      feedbackMessage.remove();
    }
  }, 2000); 
}

checkBtn.onclick = () => {
  lowNumber.classList.remove('animate__fadeInTopLeft');
  highNumber.classList.remove('animate__fadeInTopRight');
  checkNumber();
};

guessNumber.onkeyup = e => {
  lowNumber.classList.remove('animate__fadeInTopLeft');
  highNumber.classList.remove('animate__fadeInTopRight');
  if (e.keyCode === 13) {
    checkNumber();
  }
};

againBTn.onclick = () => {
  checkBtn.classList.remove('none');
  againBTn.classList.add('none');

  lowNumber.innerText = lowerBound;
  highNumber.innerText = upperBound;

  guessNumber.value = '';
  secretNumber = Math.trunc(Math.random() * 1000) + 1;
  console.log(secretNumber);
};
listColorItems.forEach(item => {
  item.onclick = e => {
    const currentItem = e.currentTarget;
    currentItem.style.textDecoration = 'line-through';
    currentItem.classList.add('opacity');
    boardColor.classList.remove('show');
    containerBoardColor.classList.remove('show');
  };
});

const setupBtn = document.querySelector('.setup-btn');

setupBtn.addEventListener('click', () => {
    if (boardColor.classList.contains('show')) {
        boardColor.classList.remove('show');
        containerBoardColor.classList.remove('show');
    } else {
        boardColor.classList.add('show');
        containerBoardColor.classList.add('show');
    }
});
