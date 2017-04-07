// gcd(a,b) = getGcdLinearCoefficients(a, b)[0] * a + getGcdLinearCoefficients(a, b)[1] * b;
//   a b         gcd *          * gcd
// a 1 0  -->  a  n  *   or   a *  n 
// b 0 1       b  m  *		  b *  m
function getGcdLinearCoefficients(a, b) {

	var aStartCoefPair = [1, 0];
	var bStartCoefPair = [0, 1];
	var answerPair = [0, 0];

	if (a <= 0 || b <= 0){
		console.log("error : arguments should be two positive integers");
		return answerPair;
	}

	function makeLinearTransformOnFirst(firstPair, secondPair, coef) {		
		return [firstPair[0] + coef * secondPair[0], 
				firstPair[1] + coef * secondPair[1]];
	}

	function makeLinearTransformOnSecond(firstPair, secondPair, coef) {		
		return [secondPair[0] + coef * firstPair[0], 
				secondPair[1] + coef * firstPair[1]];
	}

	(function recurse(a, b, aCoefPair, bCoefPair) {

		if (a % b === 0)
			answerPair = bCoefPair;
		
		else if (b % a === 0)
			answerPair = aCoefPair;

		else if (a > b) {
			recurse(a % b,
					b,
					makeLinearTransformOnFirst(aCoefPair, bCoefPair, -(a - a % b) / b),
					bCoefPair);
		}
		else if (a < b) {
			recurse(a,
					b % a,
					aCoefPair,
					makeLinearTransformOnSecond(aCoefPair, bCoefPair, -(b - b % a) / a));			
		}

	})(a, b, aStartCoefPair, bStartCoefPair);

	return answerPair;
}

test()

function test() {

	var a, b, gcdLinearCoefficients, gcd;

	for (var i = 0; i < 10; i++) {
		console.log("--------------------\ntest " + i);
		a = parseInt(Math.random() * 100); b = parseInt(Math.random() * 100);
		gcdLinearCoefficients = getGcdLinearCoefficients(a, b);
		gcd = gcdLinearCoefficients[0] * a + gcdLinearCoefficients[1] * b;
		
		console.log("gcd(" + a + ", " + b + ") = " + gcd + "\ngcdLinearCoefficients  = " + gcdLinearCoefficients);
	}
}
