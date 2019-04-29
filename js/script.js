/**
 * ownCloud - blendmaxmayaplugin
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.

 * @author Kimberly Muñoz <kipamuno@espol.edu.ec>
 * @author Paul Valle <jpvalle@espol.edu.ec>
 * @copyright Edcom-Espol 2017
 */

(function ($, OC) {
	function checkEmptyFields(input_elements) {
		var ban = true;
		var camposTexto = input_elements;
		for(var i = 0; i < camposTexto.length; i++) {
		    var value = $(camposTexto[i]).val().length;
		    if (value == 0){
				ban = false;
				alert('ese campo esta vacio');
			}
		}
		return ban;
	}

	function checkNumberRange(val1,val2){
		var valu1= parseInt(val1);
		var valu2= parseInt(val2);
		var ban = true;
		if (valu1 > valu2){
			// alert('El frame de inicio debe ser menor que el frame final');
			ban = false;
		}
		return ban; 
	}
	
	$(document).ready(function () {
		$("#frame_ini").keypress(function (e) {
			//if the letter is not digit then display error and don't type anything
			if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
				return false;
			}
		});
	
		$("#frame_fin").keypress(function (e) {
			//if the letter is not digit then display error and don't type anything
			if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
				return false;
			}
   		});
		
		$('#render').click(function(){
			var banField = checkEmptyFields(document.getElementById('form').getElementsByTagName('input'));
			var banNumber = checkNumberRange($('#frame_ini').val(),$('#frame_fin').val());
			if (banField == true ){
				if (banNumber == true ){
					var url = OC.generateUrl('/apps/blendmaxmayaplugin/job');
                    if($('#file_path').val().indexOf(".max") > -1){
                        var data = {
                            scene: $('#scene').val(),
                            file_path: $('#file_path').val(),
                            frame_ini: $('#frame_ini').val(),
                            frame_fin: $('#frame_fin').val(),
                            flag: "max"
					   };
                        //alert("max");
                    };
                    if($('#file_path').val().indexOf(".blend") > -1){
                        var data = {
                            scene: $('#scene').val(),
                            file_path: $('#file_path').val(),
                            frame_ini: $('#frame_ini').val(),
                            frame_fin: $('#frame_fin').val(),
                            flag: "blend"
                        };
                        
                    }
					if($('#file_path').val().indexOf(".mb") > -1){
                        var data = {
                            scene: $('#scene').val(),
                            file_path: $('#file_path').val(),
                            frame_ini: $('#frame_ini').val(),
                            frame_fin: $('#frame_fin').val(),
                            flag: "mb"
                        };
                        
                    }
                    //alert(data.flag);
					$.post(url, data).success(function (response) {

							$('#echo-result').text('Status:' + response.confirmation);
						localStorage.setItem('id','#processJob');
			window.location.href = '/index.php/apps/blendmaxmayaplugingui/';
						
						
					});
				}
				this.disabled = true;
			}
		});

		$('#endJob').click(function () {
			localStorage.setItem('id','#endJob');
			window.location.href = '/index.php/apps/blendmaxmayaplugingui/';
		});

		$('#processJob').click(function () {
			localStorage.setItem('id','#processJob');
			window.location.href = '/index.php/apps/blendmaxmayaplugingui/';
		});
        

		$('#buscar').click(function(){
			var arrayFiles = Array();
			$("#progress-div").show();
		});

		$('.file').click(function() {
		  var ruta = $(this).attr('url');
		  $('#file_path').val(ruta);
		  $('#progress-div').hide();
		})
			
		$('#closeNav').click(function() {
			document.getElementById("job-nav").style.height = "45px";
			$('#openNav').css('display', 'block');
			$('#job-nav ul').css('display', 'none');
			$(this).hide();
		});
		
		$('#openNav').click(function() {
			document.getElementById("job-nav").style.height = "auto";
			$('#closeNav').css('display', 'block');
			$('#job-nav ul').css('display', 'block');
			$(this).hide();
		});

		$( window ).resize(function() {
			if($(window).width() <= 770) {
				$( ".jobnav-top" ).show();
				$("#job-nav").height("45px");
			} else {
				$( "#job-nav ul" ).show();
				$( ".jobnav-top" ).hide();
				$("#job-nav").height("100%");
			}
		});
	});
})(jQuery, OC);
