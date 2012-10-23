// Justin Rasnic
// MiU 1209
// Project 4 Gold App
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

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var platformValues = [];
var j;

var autofillData = function (){
	 
};

var getData = function(){

};

// get Element shortcut
function ge(x){
	var element = document.getElementById(x);
	return element;
};

// get checkbox values
function getPlatformValues(){                      
	var checkboxes = ge("mainform").platforms;
	for(i=0, j=checkboxes.length; i<j; i++){
		if(checkboxes[i].checked){
			var checkedValue = checkboxes[i].value;
			platformValues.push(checkedValue);
		};
	};
};

var storeData = function(data){
	


	var id = Math.floor(Math.random()*10000001);
		
		
	getPlatformValues();
	//getRecommendationValue();
	var item = [];
	for(var key in data){
		var itemName = data[key].name;
		var itemValue = data[key].value;		
		var checkboxValues = [];
		var label = $('label[for^="'+ itemName +'"]').not('[generated]');
		var legend = label.closest('fieldset').find('.ui-controlgroup-label');
		var fieldname = legend.length ? legend.text() : label.text();
		if(itemName === "platforms"){						
			if(itemName != data[key-1].name){
				item[key] = [fieldname, platformValues];
				var placeholder = key;
				placeholder++;
				var remove = platformValues.length - 1;
			}

		} else{
			item[key] = [fieldname, itemValue];
		}
		console.log(key);
	};
	
	item.splice(placeholder,remove);
	localStorage.setItem(id, JSON.stringify(item));
	alert("Rating Saved!");	
	console.log(placeholder);
	console.log(remove);
	console.log(localStorage);
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){
	if(localStorage.length === 0){
			alert("There are no ratings to clear!");
			window.location.reload();
		} else{
			var ask = confirm("Are you sure you want to cleart all saved data?");
			if(ask){
				localStorage.clear();
				alert("All ratings are deleted!");
				window.location.reload();
			};
			return false;
		};

};


