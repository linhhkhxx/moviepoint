const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        console.log(seat.classList.add("selected"));
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    console.log(selectedMovieIndex);
  }
}
console.log(populateUI());
// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});
window.onload = function () {
  // Xóa dữ liệu lưu trữ cục bộ (localStorage)
  localStorage.clear();

  // Thiết lập lại các trạng thái ban đầu nếu cần
  const seats = document.querySelectorAll(".row .seat.selected");
  seats.forEach((seat) => seat.classList.remove("selected"));

  // Cập nhật lại giao diện người dùng
  updateSelectedCount();
};

// Initial count and total set
function bookTickets() {
  const movieSelect = document.getElementById("movie");
  const cinemaSelect = document.getElementById("cinema");
  const dateOptions = document.getElementsByName("date");
  const timeOptions = document.getElementsByName("time");
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedDate = [...dateOptions].find((option) => option.checked);
  const selectedTime = [...timeOptions].find((option) => option.checked);
  if (
    !movieSelect.value ||
    !cinemaSelect.value ||
    !selectedDate ||
    !selectedTime ||
    selectedSeats.length === 0
  ) {
    alert("Vui lòng chọn đầy đủ thông tin");
    return;
  }
  alert("Đặt vé thành công!");
}
function goHome() {
  window.location.href = "index.html";
} // Điều hướng về trang chủ }
