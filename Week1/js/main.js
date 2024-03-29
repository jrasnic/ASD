// Justin Rasnic
// ASD 1211
// Project 1
// Main JS using ASD template

$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#additem').on('pageinit', function(){

	delete $.validator.methods.date;

	var myForm = $('#mainform'),
		errorslink = $('#errorslink')
		;

    	myForm.validate({
		invalidHandler: function(form, validator) {
			errorslink.click();				
			var html = '';
			$("#errors ul").html("");
			for(var key in validator.submitted){
				var label = $('label[for^="'+ key +'"]').not('[generated]');
				var legend = label.closest('fieldset').find('.ui-controlgroup-label');
				var fieldname = legend.length ? legend.text() : label.text();
				html += '<li>' + fieldname +'</li>';
			};
			$("#errors ul").html(html);
			window.scrollTo(0,50);
		},
		submitHandler: function() {
		var data = myForm.serializeArray();
		console.log(data);
		storeData(data);
		}
		});
	
	//any other code needed for addItem page goes here
	
});

$('#displaylink').on('click', function(){
	getData();
});	

$('#clearbutton').on('click', function(){
	clearLocal();
});



//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var platformValues = [];
var j;

var autofillData = function (){	
	for(var n in json){
		var id = Math.floor(Math.random()*10000001);
		localStorage.setItem(id, JSON.stringify(json[n]));
	};	 
};

function getImage(catName, makeSubList){
	var imgli = document.createElement("li");
	makeSubList.appendChild(imgli);
	var newImg = document.createElement("img");
	var setSrc = newImg.setAttribute("src", "images/" + catName + ".png");
	imgli.appendChild(newImg);

};

var getData = function(){
	//if no data in local storage, use json data...would not leave in final product
	if(localStorage.length === 0){
		var ask = confirm("No ratings saved. Do you want to load test data?");
		if (ask){
			autofillData();
		};
	};

	$('#data').empty();
	var makeDiv = document.createElement("div");
	makeDiv.setAttribute("id", "items");
	var makeList = document.createElement("ul");
	makeList.setAttribute("id", "itemslist");
	makeDiv.appendChild(makeList);
	$('#data').append(makeDiv);
	$('#items').show;
	for(i=0, j=localStorage.length; i<j; i++){
		var makeLi = document.createElement("li");
		var linksLi = document.createElement("li");
		makeLi.setAttribute("id", "displaylist");
		makeList.appendChild(makeLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var makeSubList = document.createElement("ul");
		makeLi.appendChild(makeSubList);
		getImage(obj.genre[1],makeSubList);
		for(var n in obj){
			var makeSubLi = document.createElement("li");
			makeSubList.appendChild(makeSubLi);
			var optSubText = obj[n][0] + obj[n][1];
			makeSubLi.innerHTML = optSubText;
			makeSubList.appendChild(linksLi);
		};
		makeItemLinks(localStorage.key(i), linksLi);
	};
};

// create edit/delete links
function makeItemLinks(key, linksLi){

	//edit link
	var editLink = document.createElement("a");
	editLink.href = "#additem";
	editLink.setAttribute("data-role", "button");
	editLink.setAttribute("data-inline", "true");
	editLink.setAttribute("data-theme", "b");		
	editLink.key = key;
	var editText = "Edit Game";
	editLink.addEventListener("click", editItem);
	editLink.innerHTML = editText;
	linksLi.appendChild(editLink);

	//delete link
	var deleteLink = document.createElement("a");
	deleteLink.href = "#displaydata";
	deleteLink.setAttribute("data-role", "button");
	deleteLink.setAttribute("data-inline", "true");
	deleteLink.setAttribute("data-theme", "a");
	deleteLink.key = key;
	var deleteText = "Delete Game";
	deleteLink.addEventListener("click", deleteItem);
	deleteLink.innerHTML = deleteText;
	linksLi.appendChild(deleteLink);
};
// get Element shortcut
function ge(x){
	var element = document.getElementById(x);
	return element;
};
// get checkbox values
function getPlatformValues(){                      
	var checkboxes = ge('mainform').platforms;
	for(i=0, j=checkboxes.length; i<j; i++){
		if(checkboxes[i].checked){
			var checkedValue = checkboxes[i].value;
			platformValues.push(checkedValue);
		};
	};
};

var storeData = function(data){
	
	if(!data){
		var id = Math.floor(Math.random()*10000001);
	}else{
		id = data;
	};			
	getPlatformValues();
	//getRecommendationValue();
	var item = {};
	for(var key in data){
		var itemName = data[key].name;
		var itemValue = data[key].value;		
		var label = $('label[for^="'+ itemName +'"]').not('[generated]');
		var legend = label.closest('fieldset').find('.ui-controlgroup-label');
		var fieldname = legend.length ? legend.text() : label.text();
		if(itemName === "platforms"){						
			item[itemName] = [fieldname, platformValues];
		} else{
			item[itemName] = [fieldname, itemValue];
		}
		console.log(key);
	};
	
	//item.splice(placeholder,remove);
	localStorage.setItem(id, JSON.stringify(item));
	alert("Rating Saved!");	
	console.log(localStorage);
}; 

	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);

		//populate form
		$("#gname").val(item.gname[1]);
		$("#genre").val(item.genre[1]);
		$("#releasedate").val(item.releaseDate[1]);

		// find which checkboxes should be checked, and check them
		var checkboxes = ge("mainform").platforms;
		var selectedPlatforms = item.platforms[1];
		for(var n=0, m=checkboxes.length; n<m; n++){
			for(var x=0, y=selectedPlatforms.length; x<y; x++){
				if(selectedPlatforms[x] == checkboxes[n].value){
					checkboxes[n].setAttribute("checked", "checked");
				};
			};
		};
		$("#quality").val(item.quality[1]);	//NOT WORKING, NEED TO LOOK CLOSER

		// find which radio should be checked and check it
		var radios = ge("mainform").recommendation;
		for(var i=0, j=radios.length; i<j; i++){
			if(radios[i].value == "Buy" && item.recommendation[1] == "Buy"){
				radios[i].setAttribute("checked", "checked");
			} else if(radios[i].value == "Rent/Borrow" && item.recommendation[1] == "Rent/Borrow"){
				radios[i].setAttribute("checked", "checked");
			} else if(radios[i].value == "Skip" && item.recommendation[1] == "Skip"){
				radios[i].setAttribute("checked", "checked");
			};
		};

		$("#notes").val(item.notes[1]); 

		//remove initial listener from save button
		//save.removeEventListener("click", saveData);

		//change submit button to edit button
		$("#submit").value = "Edit Game Entry";
		var editSubmit = $("#submit");
		//editSubmit.addEventListener("click", storeData(this.key));

		//save key value
		editSubmit.key = this.key;
	};

var	deleteItem = function (){
	var ask = confirm("Are you sure you want to delete this game?");
	if (ask){
		localStorage.removeItem(this.key);
		alert("Game was deleted.");
		getData();
	}else{
		alert("Game was NOT deleted.");
	};	
};
					
var clearLocal = function(){
	if(localStorage.length === 0){
			alert("There are no ratings to clear!");
		} else{
			var ask = confirm("Are you sure you want to cleart all saved data?");
			if(ask){
				localStorage.clear();
				alert("All ratings are deleted!");
			};
			return false;
		};

};


