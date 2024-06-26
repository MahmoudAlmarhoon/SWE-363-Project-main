(function () {
    const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;
    let today = new Date(),
    dd = String(today.getDate()).padStart(2, "0"),
    mm = String(today.getMonth() + 1).padStart(2, "0"),
    yyyy = today.getFullYear(),
    nextYear = yyyy + 1,
    dayMonth = "05/29/", //this is the date will count it !!
    birthday = dayMonth + yyyy;
    today = mm + "/" + dd + "/" + yyyy;
    if (today > birthday) {
    birthday = dayMonth + nextYear;
    }
    //end
    const countDown = new Date(birthday).getTime(),
    x = setInterval(function() {
    const now = new Date().getTime(),
    distance = countDown - now;
    document.getElementById("days").innerText = Math.floor(distance / (day)),
    document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
    document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
    document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);
    //do something later when date is reached
    if (distance < 0) {
    document.getElementById("headline").innerText = "Mazad Finish! ";
    document.getElementById("countdown").style.display = "none";
    document.getElementById("content").style.display = "block";
    clearInterval(x);
    }
    //seconds
    }, 0)
    }());
    
    function validateBider() {
        const inputPrice = parseInt(document.getElementById('inputText').value);
        const lastPrice = parseInt(document.getElementById('lastPrice').innerText.replace(/\D/g,''));
        if (inputPrice > lastPrice) {
            const price = inputPrice.toString()
            const bidderName = prompt('Please enter your name:');
            if (bidderName) {
                document.getElementById('lastPrice').innerHTML = `<p id="lastPrice"><b>Last Price is: </b>${price}SR</p>`;
                document.getElementById('lastBider').innerHTML = `<p id="lastBider"><b>Last Bider is: </b>${bidderName}</p>`;
            }
        } else {
            alert('Your bid should be higher than the last price.');
        }
    }
