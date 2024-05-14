async function addItem(event) {
	event.preventDefault();

	const bigPicture = document.getElementById("main-photo-input").value.trim();
    const sidePic1 = document.getElementById("title").value.trim();
	const sidePic2 = document.getElementById("title").value.trim();
	const sidePic3 = document.getElementById("title").value.trim();
    // Get all radio buttons by their name
    var radioButtons = document.getElementsByName('itemType');

    // Initialize a variable to store the selected value
    var selectedValue = '';

    // Loop through each radio button
    for (var i = 0; i < radioButtons.length; i++) {
        // Check if the current radio button is checked
        if (radioButtons[i].checked) {
            // If checked, set the selectedValue to the value of the checked radio button
            selectedValue = radioButtons[i].value;
            // Break out of the loop since we found the selected radio button
            break;
        }
    }

    // If no radio button is selected, selectedValue will be an empty string
    const productName = document.getElementsByClassName("name-input").value.trim();
    const price = document.getElementsByClassName("price-input").value.trim();
    const quantity = document.getElementsByClassName("quantity-input").value.trim();
    const descreption = document.getElementsByClassName("description-inputdescription-input").value.trim();

	// var id, username;
	// const user = JSON.parse(localStorage.getItem("user"));
	// if ((user != null) && (user != "")) {
	// 	id = user.id;
	// 	username = user.fullName;
	// } else {
	// 	id = 1;
	// 	username = "Anonymous";
	// }

	if ((bigPicture != "") && (selectedValue != "") && (productName != "") &&(price != "")
         &&(quantity != "") &&(descreption != "") &&(sidePic1 != "")&&(sidePic2 != "") &&(sidePic3 != "")) {
		const payload = JSON.stringify({
			"bigPicture": bigPicture,
            "sidePic1": sidePic1,
            "sidePic2": sidePic2,
			"sidePic3": sidePic3,
			"selectedValue": selectedValue,
			"productName": productName,
			"price": price,
            "descreption": descreption,
			"quantity": quantity,
            "inCart": false,
        });
    };
};

async function getItems() {
	[questions, status] = await fetchHelper("http://localhost:3000/question", "GET", "");
	showQuestions(questions);
};


function showQuestions(qsList) {
	const questionsSection = document.getElementById("allAns");
	questionsSection.innerHTML = "";
	qsList.forEach(qs => {
		var answered = qs.answered;
		var tags = "";
		const date = new Date(qs.createdAt);

		if (answered) {
			answered = ""
		} else {
			answered = "hidden"
		}
		qs.tags.forEach(tag => {
			tags += `<a class="tag" href="#">${tag}</a>\n`;
		});

		const ques =
			`<article id="${qs._id}">
			<div class="lefted">
				<div class="upvote">
					<span class="accepted" ${answered}>✔</span>
					<br ${answered}>
					<span>${qs.answers.length} Answers</span>
				</div>
				<div>
					<h2><a href="/question/${qs._id}">${qs.title}</a></h2>
					<p>${qs.description}</p>
					${tags}
				</div>
			</div>
			<div class="details">
				<span>Asked by: ${qs.author.username}</span>
				<br>
				<span>Asked on: <time datetime="${date}">${np(date.getDate())}/${np(date.getMonth() + 1)}/${date.getFullYear()}</time></span>
			</div>
		</article>`

		questionsSection.innerHTML += ques;
	});
};
