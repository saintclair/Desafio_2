
var nivel = 1000;

$(function(){

	// Define o nivel do game conforme escolha do usuario

	$('#niveis li a').on('click',function(e){

		nivel = $(this).data('velocidade');
		run( nivel );
		
		$('#niveis li a').hide();

		$('.sidebar strong').show();

		return false;
	});

	// Permite o gammer repetir o jogo
	
	$('.try-again').on('click',function(){
		location.reload();
	});
});

function run( nivel ){	
	
	shell = $('.shell');
	shell2 = $('.shell2');

	var seq = ['1,3']; // Sequencia de movimentos [a,b] => a: barril1, b: barril2

		shell2.css('height','214');	

	$('.open').animate({
		top: '+=100'
		
	}, 500, function() { // Animation complete.

		for(var i=0, num = seq.length; i<num; i++){
			el = seq[i].split(',');
			movimento(el[0],el[1]);
		}
		

		shell.on('click',function(){

			shell2.animate({
				top: '-=100'
			}, 500, function() { // Animation complete.
				$(this).css('height','311');
			});

			msg = $(this).hasClass('shell2') ? 'voce ganhou :)' : 'voce perdeu :(';	
			$('.sidebar strong').hide();
			$('.try-again').show();
			alert(msg);
		
		});

	});	



}

/*
	@description: Executa o movimento dado barril a e b
	@params:a{int},b{int}
*/

function movimento(a,b){

	el1 = $('.shell'+a);
	p1 = el1.position();

	el2 = $('.shell'+b);
	p2 = el2.position();

	dir = ( a == 1 ) ? '+' : '-';
	dir2 = ( a == 1 ) ? '-' : '+';
	/*
	if( p1.left == 0 ){
		esq = ((p1.left+p2.left)/2);
	}else{
		esq = (p1.left+100);
	}*/
	pCentral = ((p1.left+p2.left)/2);

	DestTopEl1 = '-=100';
	DestLeftEl1 = dir+'='+pCentral;

	DestTopEl2 = '+=100';
	DestLeftEl2 = dir2+'='+pCentral;

	el1.stop(true).animate(
		{top:DestTopEl1, left:DestLeftEl1}, 
		nivel, 
		function() {
			$(this).stop(true).animate(p2,nivel,function(){
				//console.log('mov:' + a +':'+ b);
			});
			
		}
	);

	el2.stop(true).animate(
		{top:DestTopEl2, left:DestLeftEl2},
		nivel, 
		function() {
			$(this).stop(true).animate(p1,nivel,function(){
				//console.log('mov:' + a +':'+ b);
			});
		}
	);		

}
