
var nivel = 1000;
var qtdMovimentos = 3;

var dom = {
	shell : $('.shell'),
	el1   : $('.shell1'),
	el2   : $('.shell2'),
	el3   : $('.shell3'),
	open  : $('.open'),
	itemLevel : $('#niveis li a'),
	msg : $('.sidebar strong')
};
	
var niveis = {
	'easy'     : {"speed":1000,"move":3},
	'normal'   : {"speed":500 ,"move":4},
	'hard'     : {"speed":300 ,"move":5},
	'very-hard': {"speed":200 ,"move":6},
};

var sound = new Audio('static/audio/theme.mp3'); 

$(function(){

	playAudio();

	$('.playAudio').on('click',function(){
		$('.stopAudio').removeClass('playerSelected');
		$(this).addClass('playerSelected');
		playAudio();
	});

	$('.stopAudio').on('click',function(){
		sound.pause();
		$(this).addClass('playerSelected');
		$('.playAudio').removeClass('playerSelected');
		
		return false;
	});

	// Define o nivel do game conforme escolha do usuario
	dom.itemLevel.on('click',function(e){
		level = $(this).data('nivel');
		run();
		dom.itemLevel.hide();
		dom.msg.show();
		return false;
	});

	// Permite o gammer repetir o jogo	
	$('.try-again').on('click',function(){
		location.reload();
	});
});

function playAudio(){

	sound.addEventListener('ended', function() {
	    this.currentTime = 0;
	    this.play();
	}, false);		
	sound.play();

}

function run(){	

	nivel = niveis[level].speed;
	qtdMovimentos = niveis[level].move;

	dom.el2.css('height','214');	

	dom.open.animate({
		top: '+=100'		
	}, 500, function() { // Animation complete.
		
		movimento();
			
		dom.shell.on('click',function(){

			dom.el2.animate({
				top: '-=100'
			}, 500, function() { // Animation complete.
				$(this).css('height','311');
			});

			msg = $(this).hasClass('shell2') ? 'você ganhou :)' : 'você perdeu :(';	

			$('.sidebar strong').hide();
			$('.try-again').show();
			alert(msg);
		
		});

	});	

}

/*
	@description: Executa o movimento dado barril a e b
*/

function movimento(){

	p1 = dom.el1.position();
	p2 = dom.el2.position();
	p3 = dom.el3.position();
	
	arrRand = [0,1,2];
	rand = arrRand[Math.floor(Math.random() * arrRand.length)];

	var combinacoes = [
		[{"elFrom":dom.el1,"elTo":p2}, {"elFrom":dom.el2,"elTo":p1}],
		[{"elFrom":dom.el2,"elTo":p3}, {"elFrom":dom.el3,"elTo":p2}],
		[{"elFrom":dom.el3,"elTo":p1}, {"elFrom":dom.el1,"elTo":p3}]
	];
	
	// Move shell A => B
	combinacoes[rand][0].elFrom.stop(true).animate(
		combinacoes[rand][0].elTo,
		nivel, 
		function() {
			/*silent*/
		}
	);

	// Move shell B => A
	combinacoes[rand][1].elFrom.stop(true).animate(
		combinacoes[rand][1].elTo,
		nivel, 
		function() {
			if( qtdMovimentos > 1 ){
				movimento();
				qtdMovimentos--;
			}else{
				dom.msg.empty().html('Agora clique no barril onde esta a moeda');
			}
		}
	);


}
