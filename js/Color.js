class Color {
	// Colores predefinidos
	static BLACK = 0x000000;
	static WHITE = 0xFFFFFF;
	static RED = 0xFF0000;
	static GREEN = 0x00FF00;
	static BLUE = 0x0000FF;
	static YELLOW = 0xFF0000;
	static CYAN = 0x00FF00;
	static MAGENTA = 0x0000FF;


	// BIN
	static RGB_BIN(r, g, b) {
		if(arguments.length == 1) b = r.b, g = r.g, r = r.r;
		return (r << 16) | (g << 8) | b;
	}
	static BIN_RGB(c) {
		return { r: c >> 16, g: (c >> 8) & 255, b: c & 255 };
	}
	static HSV_BIN(h, s, v) {
		if (arguments.length == 1) s = h.s, v = h.v, h = h.h;
		return Color.RGB_BIN(Color.HSV_RGB(h, s, v));
	}
	static BIN_HSV(c) {
		return Color.RGB_HSV(Color.BIN_RGB(c));
	}


	// HEX RGB
	/**
	 * Convierte HEX a RGB
	 * 
	 * @param color: formato entrada '#000000'
	 * @return: {r, g, b}
	 */
	static HEX_RGB(color) {
		color = color.substr(1);
		return { r: parseInt(color.substr(0, 2), 16), g: parseInt(color.substr(2, 2), 16), b: parseInt(color.substr(4, 2), 16) };
	}
	/**
	 * Convierte RGB a HEX (formato #rrggbb)
	 * 
	 * @params r, g, b: 0-255 cada uno
	 * @return: formato salida '#000000'
	 */
	static RGB_HEX(r, g, b) {
		if(arguments.length == 1) b = r.b, g = r.g, r = r.r;
		function decToHex(num) {
			var cad = parseInt(num).toString(16);
			return (cad.length === 1) ? `0${cad}` : `${cad}`;
		}
		return `#${decToHex(r)}${decToHex(g)}${decToHex(b)}`;
	}
	/**
	 * Entra un color en formato rgb(r, g, b) y devuelve un objeto rgb
	 * 
	 * @param c: string con el color
	 * @return: objeto rgb
	 */
	static STR_RGB(c) {
		c = c.substr(4, c.length-5).split(", ");
		return { r: Number(c[0]) , g: Number(c[1]) , b: Number(c[2]) };
	}


	/**
	 * Modifica el brillo de un color
	 * 
	 * @param c: Integer color
	 * @param p: Float porcentaje de brillo [0, 1]
	 * @return: Integer color modificado
	 */
	static brillo(c, p) {
		c = Color.RGB_HSV(Color.BIN_RGB(c));
		return Color.RGB_BIN(Color.HSV_RGB(c.h, c.s, c.v * p));
	}

	/**
	 * Modifica el matiz de un color
	 * 
	 * @param c: Integer color
	 * @param h: Float incremento de matiz [0, 1)
	 * @return: Integer color modificado
	 */
	static matiz(c, h) {
		c = Color.RGB_HSV(Color.BIN_RGB(c));
		return Color.RGB_BIN(Color.HSV_RGB((c.h + h) % 1, c.s, c.v));
	}

	/**
	 * Converts an RGB color value to HSL. Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
	 * Assumes r, g, and b are contained in the set [0, 255] and
	 * returns h, s, and l in the set [0, 1].
	 *
	 * @param   Number  r       The red color value
	 * @param   Number  g       The green color value
	 * @param   Number  b       The blue color value
	 * @return  Array           The HSL representation
	 */
	static RGB_HSL(r, g, b) {
		if(arguments.length == 1) b = r.b, g = r.g, r = r.r;
		r /= 255, g /= 255, b /= 255;
		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2;

		if(max == min)
		    h = s = 0; // achromatic
		else {
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch(max){
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		}
		return { h: h, s: s, v: v };
	}

	/**
	 * Converts an HSL color value to RGB. Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
	 * Assumes h, s, and l are contained in the set [0, 1] and
	 * returns r, g, and b in the set [0, 255].
	 *
	 * @param   Number  h       The hue
	 * @param   Number  s       The saturation
	 * @param   Number  l       The lightness
	 * @return  Array           The RGB representation
	 */
	static HSL_RGB(h, s, l) {
		if (arguments.length == 1) s = h.s, v = h.v, h = h.h;
		var r, g, b;

		if(s == 0)
		    r = g = b = l; // achromatic
		else {
			function hue2rgb(p, q, t) {
				if(t < 0) t += 1;
				if(t > 1) t -= 1;
				if(t < 1/6) return p + (q - p) * 6 * t;
				if(t < 1/2) return q;
				if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				return p;
			}
			var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p = 2 * l - q;
			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
		}
		return { r: Math.round(r*255), g: Math.round(g*255), b: Math.round(b*255) };
	}

	/**
	 * Converts an RGB color value to HSV. Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
	 * Assumes r, g, and b are contained in the set [0, 255] and
	 * returns h, s, and v in the set [0, 1].
	 *
	 * @param   Number  r       The red color value
	 * @param   Number  g       The green color value
	 * @param   Number  b       The blue color value
	 * @return  Array           The HSV representation
	 */
	static RGB_HSV(r, g, b) {
		if(arguments.length == 1) b = r.b, g = r.g, r = r.r;
		r /= 255, g /= 255, b /= 255;
		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, v = max;
		var d = max - min;

		s = max == 0 ? 0 : d / max;
		if(max == min)
			h = 0; // achromatic
		else {
			switch(max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		}
		return { h: h, s: s, v: v };
	}

	/**
	 * Converts an HSV color value to RGB. Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
	 * Assumes h in [0, 1) s and v are contained in the set [0, 1] and
	 * returns r, g, and b in the set [0, 255].
	 *
	 * @param   Number  h       The hue
	 * @param   Number  s       The saturation
	 * @param   Number  v       The value
	 * @return  Array           The RGB representation
	 */
	static HSV_RGB(h, s, v) {
		if (arguments.length == 1) s = h.s, v = h.v, h = h.h;
		var r, g, b;
		var i = Math.floor(h * 6);
		var f = h * 6 - i;
		var p = v * (1 - s);
		var q = v * (1 - f * s);
		var t = v * (1 - (1 - f) * s);

		switch(i % 6) {
			case 0: r = v, g = t, b = p; break;
			case 1: r = q, g = v, b = p; break;
			case 2: r = p, g = v, b = t; break;
			case 3: r = p, g = q, b = v; break;
			case 4: r = t, g = p, b = v; break;
			case 5: r = v, g = p, b = q; break;
		}
		return { r: Math.round(r*255), g: Math.round(g*255), b: Math.round(b*255) };
	}

	static HSV_HSL(h, s, v) {
		if (arguments.length === 1) s = h.s, v = h.v, h = h.h;
		var _s = s * v, _l = (2 - s) * v;
		_s /= (_l <= 1) ? _l : 2 - _l;
		_l /= 2;
		return { h: h, s: _s, l: _l };
	}

	static HSL_HSV(h, s, l) {
		if (arguments.length === 1) s = h.s, l = h.l, h = h.h;
		l *= 2;
		s *= (l <= 1) ? l : 2 - l;
		return { h: h, s: (2 * s) / (l + s), v: (l + s) / 2 };
	}
}