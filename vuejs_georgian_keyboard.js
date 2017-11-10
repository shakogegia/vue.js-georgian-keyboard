Vue.directive('georgian', {
	// When the bound element is inserted into the DOM...
	inserted: function (el) {
		// Focus the element
		el.addEventListener('keypress', (e) => {
			// console.log(e.which)
			function setSelectionRange(input, selectionStart, selectionEnd) {
				if (input.setSelectionRange) {
					input.focus();
					input.setSelectionRange(selectionStart, selectionEnd);
				} else if (input.createTextRange) {
					var range = input.createTextRange();
					range.collapse(true);
					range.moveEnd('character', selectionEnd);
					range.moveStart('character', selectionStart);
					range.select();
				}
			}

			function setCaretToPos(input, pos) {
			    setSelectionRange(input, pos, pos);
			}

	        function isLetter(str) {
				return str.length === 1 && str.match(/[a-z]/i);
			}

			function translate(code) {
			    return String.fromCharCode( ide(code) );
			}

			// Mapping
	        function ide(num) {
	            var value = lookUp[num];
	            return value ? value : num;
	        }
	        //lookup table
	        var lookUp = {
	            74: 4319, 82: 4326, 83: 4328, 90: 4331,
	            97: 4304, 98: 4305, 99: 4330, 100: 4307,
	            101: 4308, 102: 4324, 103: 4306, 104: 4336,
	            105: 4312, 106: 4335, 107: 4313, 108: 4314,
	            109: 4315, 110: 4316, 111: 4317, 112: 4318,
	            113: 4325, 114: 4320, 115: 4321, 116: 4322,
	            84: 4311, 117: 4323, 118: 4309, 119: 4332,
	            87: 4333, 120: 4334, 121: 4327, 122: 4310,
	            67: 4329
	        };

			const char = String.fromCharCode(e.which),
            	code = e.which;

            if (!isLetter(char)) return;

			e.preventDefault()

            const geChar = translate(code);

			this.value = e.target.value

        	if (this.selectionStart || this.selectionStart === 0) {
                var start = this.selectionStart;
                var end = this.selectionEnd;
                var prefix = this.value.substring(0, start);
                var suffix = this.value.substring(end, this.value.length);

                this.value = prefix + geChar + suffix;
            } else {
                this.value += geChar;
            }

            e.target.value = this.value
		})

	}
})