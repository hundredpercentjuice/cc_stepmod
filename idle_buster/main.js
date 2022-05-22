
load_multiplier = function(){
	var request = new XMLHttpRequest();
	request.open('GET', 'https://www.imjs.dev/idle_buster/'+Game.modSaveData['idle_buster']+'/get_multiplier', false);  // `false` makes the request synchronous
	request.send(null);
	//Need to add better error handling
	if (request.status === 200) {
	multiplier = 1 + parseFloat(request.responseText);
	}
		Game.registerHook('cookiesPerClick', function(current){
			
		return current * multiplier ;
	});
		Game.registerHook('click', function(){
			if(Math.floor(Math.random() * 40) == 12){
	Game.particleAdd(Game.mouseX+Math.random()*8-4,100+Game.mouseY-8+Math.random()*8-4,0,-2,1,4,2,'','Step Bonus:*'+Beautify(multiplier ,3));}
	});
}
Game.registerMod("idle_buster", {
 init: function() {
	//Need to add buttons to config menu
	let MOD=this;
	if(Game.modSaveData['idle_buster']){
		load_multiplier();
	}
	else{
		Game.Prompt(`<h3>Name your bakery</h3><div class="block" style="text-align:center;">What is your Idle Buster ID?</div>
					<div class="block"><input type="text" style="text-align:center;width:100%;" id="ext_idInput" value=""/></div>`,
					[['Confirm','if (l(\'ext_idInput\').value.length>0) {Game.modSaveData[\'idle_buster\'] = l(\'ext_idInput\').value; load_multiplier(); Game.ClosePrompt();}'],
					'Cancel']);
		l('ext_idInput').focus();
		l('ext_idInput').select();
	}
 },

 save: function() {
	//Force save added to prompt, need to fix
 },

 load: function(str) {
	//Force load added to method, need to fix 
	this.ext_id = str
 }
})

