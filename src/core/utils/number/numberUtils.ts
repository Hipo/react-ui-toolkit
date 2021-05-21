import {ParseNumberOptions} from "./numberTypes";

/**
 * Coerces a number scientific notation. {@link https://observablehq.com/@mbostock/localized-number-parsing | Reference}
 * @param {object} options - An object includes parse number options
 * @param {string} options.locale - Default locale used is browser locale
 * @param {number} options.maximumFractionDigits - The maximum digit a decimal can have
 * @param {number} value - A number to convert to string
 * @returns {string} The value after coercing the given value to a scientific notation.
 */
function parseNumber(
  options: ParseNumberOptions = {locale: navigator.language, maximumFractionDigits: 0},
  value: string
) {
  const {THOUSANDTHS_SEPARATOR, DECIMAL_NUMBER_SEPARATOR} = getNumberSeparators(
    options.locale
  );
  const numerals = getLocaleNumerals(options.locale);
  const numeral = new RegExp(`[${numerals.join("")}]`, "g");
  const digitMapper = getDigit(new Map(numerals.map((d, i) => [d, i])));
  let parsedNumber = value
    .replace(new RegExp(`[${THOUSANDTHS_SEPARATOR}]`, "g"), "")
    .replace(new RegExp(`[${DECIMAL_NUMBER_SEPARATOR}]`), ".")
    .replace(numeral, digitMapper);

  if (typeof options.maximumFractionDigits === "number") {
    const [integerPart, decimalPart] = parsedNumber.split(".");

    if (options.maximumFractionDigits === 0) {
      parsedNumber = integerPart;
    } else if (decimalPart && decimalPart.length === options.maximumFractionDigits + 1) {
      return parsedNumber.slice(0, parsedNumber.length - 1);
    }
  } else {
    parsedNumber = String(parsedNumber);
  }

  return parsedNumber;
}

function getDigit(digitMap: Map<string, number>) {
  return (d: string) => {
    const digit = digitMap.get(d);

    return typeof digit === "number" ? String(digit) : "";
  };
}

function mapDigitsToLocalVersion(
  {locale = navigator.language}: {locale?: string},
  digits: string
) {
  return digits.split("").map(mapDigitToLocalVersion({locale})).join("");
}

function mapDigitToLocalVersion({locale = navigator.language}: {locale?: string}) {
  const numerals = getLocaleNumerals(locale);
  const digitMap = new Map(numerals.map((d, i) => [i, d]));

  return (digit: string) => digitMap.get(parseInt(digit));
}

function getNumberSeparators(locale = navigator.language) {
  // eslint-disable-next-line no-magic-numbers
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
  const THOUSANDTHS_SEPARATOR = parts.find((d) => d.type === "group")!.value;
  const DECIMAL_NUMBER_SEPARATOR = parts.find((d) => d.type === "decimal")!.value;

  return {THOUSANDTHS_SEPARATOR, DECIMAL_NUMBER_SEPARATOR};
}

function getLocaleNumerals(locale = navigator.language) {
  const numerals = new Intl.NumberFormat(locale, {useGrouping: false})
    // eslint-disable-next-line no-magic-numbers
    .format(9876543210)
    .split("")
    .reverse();

  return numerals;
}

export {parseNumber, getDigit, getNumberSeparators, mapDigitsToLocalVersion};
