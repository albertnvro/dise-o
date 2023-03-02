
		/**
		 * Ajuste decimal de un número.
		 * 
		 * @param {String}  tipo  El tipo de ajuste (round, floor, ceil).
		 * @param {Number}  valor El numero.
		 * @param {Integer} exp   El exponente (el logaritmo 10 del ajuste base).
		 * @returns {Number} El valor ajustado.
		 */
		function decimalAdjust(type, value, exp) {
			// Si el exp no está definido o es cero...
			if (typeof exp === 'undefined' || +exp === 0)
				return Math[type](value);

			value = +value;
			exp = +exp;

			// Si el valor no es un número o el exp no es un entero...
			if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
			  return NaN;

			// Shift
			value = value.toString().split('e');
			value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
			
			// Shift back
			value = value.toString().split('e');
			return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
		}


		var timeouts = new Set();
		var xhr_enable = true, debug = true;
		var pos1, pos2, mode = 0, potencia = 0;

		$(document).ready(function() {
			generarTabla(355, 30);
			calcPotencia();
			$("#pick1").ColorPicker({ color: "#ff0000", flat: true });
			$("#pick2").ColorPicker({ color: "#000000", flat: true });
			$("#capa").click(function(event) { cerrarCapa(this); }).children().click(function(event) { return false; });
			$("#code_text")[0].addEventListener("input", async function(event) {
				if(this.value.length > 10) {
					if(await pegar(this.value))
						cerrarCapa("#capa");
				}
			});
		});

		function cerrarCapa(obj) {
			$(obj).children().hide(function(event) {
				$(this).children("textarea").val("");
				$(obj).fadeOut();
			});
		}

		function showResp(resp) {
			if(resp.hasOwnProperty(`error`) && resp.error.hasOwnProperty(`code`) && resp.error.code!=0)
				console.log(`Error (${resp.error.code})${resp.error.hasOwnProperty(`msg`) ? `: ${resp.error.msg}` : ``}`)
			else if(debug && resp.hasOwnProperty(`data`) && resp.data.hasOwnProperty(`msg`))
				console.log(`${resp.data.msg}`);
		}

		async function sendRemote(cmd, params) {
			var resp;
			try {
				resp = await envio(Object.assign({ control: true, accion: cmd }, params)).catch(function(e){ console.log(e); });
				if(typeof resp == "string")
					resp = JSON.parse(resp);
			}
			catch(e) {
				resp = { error: { code: 1, msg: "No se pudo decodificar la respuesta" } };
			}
			showResp(resp);
		}

		function envio(data) {
			return new Promise(function(resolve, reject) {
				if(!xhr_enable)
					resolve(JSON.stringify({ error: { code: 0, msg: "" }, data: { msg: "Envio XHR desactivado" } }));
				else
					$.ajax({
						type: "post",
						url: "procesado.php",
						data: data,
						success: resolve,
						error: reject
					});
			});
		}

		function saveLedsArray() {
			console.log(btoa(JSON.stringify({ o: 0, a: getLedsArray() })));
			console.log($(".pixel").length);
		}

		function reload() {
			
		}

		function json_cod(a) {
			return btoa(JSON.stringify(a));
		}
		function json_dec(a) {
			return JSON.parse(atob(a));
		}

		/**
		 * Pega, decodifica y envía un codigo json led.
		 * Contiene instrucciones de render.
		 * 
		 */
		async function pegar(code) {
			// WzAsMCwwLDAsMCwyNjIzOTksMjYyMzk5LDI2MjM5OSwyNjIzOTksMCwwLDAsMCwwLDAsMCwwLDAsMCwxNjc0MTEyMCwxNjc0MTEyMCwwLDE2NzQxMTIwLDE2NzQxMTIwLDAsMTY3NDExMjAsMTY3NDExMjAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMTY3MTE5MTQsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMTY3MTE5MTQsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDE2NzExOTE0LDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMTY3MTE2ODAsMTY3MTE2ODAsMTY3MTE2ODAsMTY3MTE2ODAsMTY3MTE2ODAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDE2NzYyODgwLDE2NzYyODgwLDE2NzYyODgwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwzNjY5NzYwLDAsMzY2OTc2MCwwLDM2Njk3NjAsMCwzNjY5NzYwLDAsMzY2OTc2MCwwLDM2Njk3NjAsMCwzNjY5NzYwLDAsMCwwLDAsMCwwLDAsMCwwLDAsNDkxNTEsNDkxNTEsMCwwLDAsMCwwLDAsMCwwLDExMDA3LDAsMTEwMDcsMCwxMTAwNywwLDExMDA3LDAsMTEwMDcsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEwMDI3MjYzLDAsMTAwMjcyNjMsMCwxMDAyNzI2MywwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDE2NzExNjgwLDAsMCwwLDAsMCwxNjcxMTY4MCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMzY2OTc2MCwzNjY5NzYwLDM2Njk3NjAsMzY2OTc2MCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0
			// eyAibyI6IDAsICJhIjogWzAsMCwwLDAsNjUzNjksNjUzNjksMCw2NTM2OSw2NTM2OSwwLDAsMCw1NzY4MDY2LDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsNDQzNDksMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwxMjA3NzU2OCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMTIwNzc1NjgsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEyMDc3NTY4LDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMjU1LDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwyNTUsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSB9
			try {
				//var code = await navigator.clipboard.readText();
				var offset = 0, tira_json = json_dec(code);

				if(!tira_json.hasOwnProperty(`o`))
					tira_json.o = 0;

				if(!tira_json.hasOwnProperty(`a`))
					tira_json.a = [];

				for (var i = tira_json.o; i < tira_json.a.length; i++)
					setPixel(i, Color.BIN_RGB(tira_json.a[i]));

				// Render
				calcPotencia();
				await sendRemote("json", { code: json_cod(tira_json) });
				return true;
			}
			catch (e) {
				console.log('Error al decodificar la cadena');
			}
			return false;
		}

		function getLedsArray() {
			var tira = [];
			$(".pixel").each(function(index) {
				tira[index] = Color.RGB_BIN(Color.STR_RGB($(this).css("background-color")));
			});
			return tira;
		}

		function calcPotencia() {
			var color1, color2;
			if(arguments.length == 2) {
				color1 = (arguments[0].r + arguments[0].g + arguments[0].b) / 2550;
				color2 = (arguments[1].r + arguments[1].g + arguments[1].b) / 2550;
				potencia = potencia + color2 - color1;
			}
			else {
				potencia = 0;
				$(".pixel").each(function(index) {
					color1 = Color.STR_RGB($(this).css("background-color"));
					potencia += (color1.r + color1.g + color1.b) / 255;
				});
				potencia/=10;
			}

			$("#ifn_ledpower").text(`${decimalAdjust("round", potencia, -3)}w`);
			return potencia;
		}

		function ledInfo(index, color) {
			index = (typeof(index) == "object") ? $(index).attr("data") : index;
			$("#ifn_ledpos").text(index);
			$("#ifn_ledcolor").text(`${color.r}, ${color.g}, ${color.b}`);
			$("#ifn_ledcolor").css(`background-color`, Color.RGB_HEX(color));
		}

		function changeMode(m) {
			unSelect();
			var obj = $("#ifn_clk"), modes = 2;
			mode = ( m === undefined ? mode+1 : m ) % modes;
			switch (mode) {
				case 0:
					obj.text("Click");
					break;
				case 1:
					obj.text("Select");
					break;
				case 2:
					obj.text("Sel #2");
					break;
				case 3:
					obj.text("Sel #3");
					break;
				default:
					break;
			}
			return mode;
		}

		function clearTimeouts(times) {
			for (let id of times) {
				clearTimeout(id);
				times.delete(id);
			}
		}

		/**
		 * Pone todos los Leds al color del selector secundario.
		 * Contiene instrucciones de render.
		 * 
		 */
		function clearLeds() {
			var tira_json = { o: 0, a: [] };
			$(".pixel").each(function(obj) {
				tira_json.a.push(Color.RGB_BIN($(`#pick2`).ColorPickerGetColor()));
				setPixel(this, $(`#pick2`).ColorPickerGetColor());
			});

			//Render
			calcPotencia();
			sendRemote("json", { code: json_cod(tira_json) });
		}

		/**
		 * Pone un pixel de un determinado color. Contiene instrucciones
		 * de render.
		 * 
		 * @param index: integer con el índice u objeto .pixel
		 * @param color: color formato RGB
		 * @param send (default=false): render
		 */
		function setPixel(index, color, send = false) {
			var obj = $((typeof(index) == "object") ? index : `#led_${index}.pixel`);
			index = $(obj).attr("data");
			var color_old = Color.STR_RGB(obj.css("background-color"));
			var color_hex = Color.RGB_HEX(color);
			obj.css("background-color", color_hex);

			// Render
			if(send) {
				calcPotencia(color_old, color)
				sendRemote("led", { index: index, color: Color.RGB_BIN(color) });
			}
		}


		// Funciones selectoras
		/**
		 * Pone los leds del intervalo pos1 a pos2
		 * del color indicado por parámetro. Contiene
		 * instrucciones de render.
		 * 
		 * @param c: color que se aplicará
		 */
		function setSelection(c, sep = 1) {
			if(pos1 !== undefined && pos2 !== undefined) {
				var max, min, tira_json = {};
				if(pos1 < pos2) {
					min = pos1;
					max = pos2;
				}
				else {
					min = pos2;
					max = pos1;
				}

				tira_json.o = min;
				tira_json.a = [];
				for (var i = min; i <= max; i++) {
					if(sep==1 || i%sep == min%sep)
						setPixel(i, c);
					tira_json.a[i-min] = Color.RGB_BIN(Color.STR_RGB($(`#led_${i}.pixel`).css("background-color")));
				}

				// Render
				calcPotencia()
				sendRemote("json", { code: json_cod(tira_json) });
			}
		}
		function unSelect() {
			selectPut(undefined, undefined);
		}
		function selectPut(posA, posB) {
			pos1 = posA;
			pos2 = posB;
			$("#ifn_pos1").text(pos1 === undefined ? "n/a" : pos1);
			$("#ifn_pos2").text(pos2 === undefined ? "n/a" : pos2);
			selectDraw();
		}
		function selectDraw() {
			$(".pixel").removeClass("select1");
			if(pos1 !== undefined && pos2 !== undefined) {
				var max, min;
				if(pos1 < pos2) min = pos1, max = pos2;
				else 			min = pos2, max = pos1;
				for (var i = (min + 1); i < max; i++)
					$(`#led_${i}.pixel`).addClass("select1");
			}
		}
		function select(obj) {
			obj = $((typeof(obj) == "object") ? obj : `#led_${obj}.pixel`);
			var index = parseInt(obj.attr("data"));

			if(pos2 === undefined && pos1 !== undefined)
				selectPut(pos1, index);
			else
				selectPut(index, undefined);

			if(pos1 !== undefined)
				$(`#led_${pos1}.pixel`).addClass("select1");
			if(pos2 !== undefined)
				$(`#led_${pos2}.pixel`).addClass("select1");
		}


		// Eventos
		function pixelClickLeft(event) {
			event.preventDefault();
			switch (mode) {
				case 0:
					setPixel(this, $(`#pick1`).ColorPickerGetColor(), true);
					ledInfo(this, $(`#pick1`).ColorPickerGetColor());
					break;
				case 1:
				case 2:
				case 3:
					select(this);
					break;
			}
		}
		function pixelClickRight(event) {
			event.preventDefault();
			switch (mode) {
				case 0:
					setPixel(this, $(`#pick2`).ColorPickerGetColor(), true);
					ledInfo(this, $(`#pick2`).ColorPickerGetColor());
					break;
				case 1:
				case 2:
				case 3:
					unSelect();
					break;
			}
		}
		function pixelClickDoble(event) {
			event.preventDefault();
		}
		function pixelClickHoverIn(event) {
			ledInfo(this.getAttribute("data"), Color.STR_RGB($(this).css("background-color")));
		}
		function pixelClickHoverOut(event) {
			//console.log($(this));
		}


		// Botones y controles HTML
		function bt_mode() {
			changeMode();
		}
		function bt_set() {
			setSelection($(`#pick1`).ColorPickerGetColor(), parseInt($("input[name='setmode']:checked").val()));
		}
		function bt_clear() {
			clearLeds();
		}
		function bt_save() {
			saveLedsArray();
		}
		function bt_paste() {
			//pegar();
			$("#capa").fadeIn(100, function(event){
				//$("#capa > div").css("display", "block");
				$("#capa > div").show(100);
			});
			//$("#capa").css("display", "block");
		}
		function bt_reload() {
			reload();
		}


		// Clases y definiciones
		function generarTabla(size, max_width) {
			var cad = ``;
			for (var i = 0; i < size; i++) {
				let t = i % max_width, clase = `pixel`;
				if(parseInt(i/max_width)%2 == 0) {
					clase += ` izq`;
					if(t == 0)
						clase += ` botton`;
					else if(t == max_width-1)
						clase += ` top`;
				}
				else {
					clase += ` der`;
					if(t == 0)
						clase += ` botton`;
					else if(t == max_width-1)
						clase += ` top`;
				}
				cad += `<div id="led_${i}" class="${clase}" data="${i}"><div></div><div></div><div></div><div></div><label>${i}</label></div>`;
			}
			$(`.tabla`).html(cad);

			var pixel_size = 50;
			var tmpix = pixel_size-2;
			var padding = 0;
			$(`#tablero`).css("width", `${max_width * pixel_size}px`);
			$(`.tabla>.pixel`).css({
				"font-size": `${tmpix * 0.35}px`,
				"width": `${tmpix}px`,
				"height": `${tmpix}px`
			});

			$(`#tablero>.controles`).css("width", `${max_width * pixel_size - padding * 2}px`);
			$(`#tablero>.controles`).css("padding", `${padding}px`);
			$(`#tablero>.tabla`).css("width", `100%`);
			$(`#tablero>.tabla`).css("height", `${Math.ceil(size / max_width) * pixel_size}px`);

			// Eventos
			$(`.tabla>.pixel`).click(pixelClickLeft);
			$(`.tabla>.pixel`).contextmenu(pixelClickRight);
			$(`.tabla>.pixel`).dblclick(pixelClickDoble);
			$(`.tabla>.pixel`).hover(pixelClickHoverIn, pixelClickHoverOut);
		}
