// Jeremy Colegrove, Tue Dec 2, 2025, Advent of Code Day 2

/**
 * The algorithm is close to O(N) time, providing simple straightforward steps to get all substr repetitions
 * Method:
 * 1) Create frequency map of characters in string. "addaadda" -> {a: 4, d: 4}
 * 2) Compute the greatest common divisor of the frequency values. Example:
 *          gcd({g: 5, d: 10}) = 5
 *          gcd({z:4, m: 1}) = 1
 * 3) If gcd is 1 or 0, then return false, it is not a made of repeating substrings
 * 4) Loop over every multiple m of gcd, add to results if substring(0, len(p) / m) is repeating
 *
 *
 * EXAMPLE: "aaabbbaaabbbaaabbb" ("aaabbb" repeating 3 times)
 * 1) Generate frequency map => {a: 9, b: 9}
 * 2) Get gcd => 9
 * 3) gcd is not 0 or 1, return []
 * 4) 3 is the first multiple of 9, so divide original string by 3 and test substring (0, 18/3) => "aaabbb"
 * This is the correct result
 *
 * The worst case timing for this algo is O(N^(1 + 1/lnlnN)), slightly larger than O(N),
 * but for most real world inputs is O(N) because most numbers have few divisors.
 *
 * @param {string} str the string to test if is made of substrings
 * @returns boolean
 */

export function extractRepeatingSubstrings(str) {
	const substrings = [];
	// build map of character frequency O(n)
	const freq = {};
	for (const ch of str) freq[ch] = (freq[ch] || 0) + 1;

	// find gcd
	let gm = 0;
	for (const key in freq) {
		// Update the running GCD with the current value
		gm = gcd(gm, freq[key]);
		if (gm === 1) break;
	}

	// early escape if gcd is 1 or 0
	if (gm <= 1) return [];
	// loop over all multiples of gcd
	for (let k = 2; k <= gm; k++) {
		if (gm % k !== 0) continue;
		// test str split into k pieces
		if (isRepeating(str, str.length / k)) {
			// repeating substring found
			substrings.push(str.substring(0, str.length / k));
		}
	}

	return substrings;
}

function isRepeating(str, len) {
	for (let i = 0; i < str.length; i++) {
		if (str[i] !== str[i % len]) {
			return false;
		}
	}
	return true;
}

function gcd(a, b) {
	while (b !== 0) {
		const temp = b;
		b = a % b;
		a = temp;
	}
	return a;
}
