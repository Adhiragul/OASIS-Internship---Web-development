document.addEventListener('DOMContentLoaded', () => {
    const temperatureInput = document.getElementById('temperature');
    const unitFromSelect = document.getElementById('unit-from');
    const unitToSelect = document.getElementById('unit-to');
    const convertBtn = document.getElementById('convert-btn');
    const resultText = document.getElementById('result-text');
    const swapIcon = document.querySelector('.swap-icon');

    // Conversion functions
    const convert = () => {
        const tempValue = parseFloat(temperatureInput.value);
        const unitFrom = unitFromSelect.value;
        const unitTo = unitToSelect.value;

        if (isNaN(tempValue)) {
            resultText.textContent = "Please enter a valid number";
            resultText.style.fontSize = "1.2rem";
            return;
        }

        resultText.style.fontSize = "2rem";
        let result = 0;

        if (unitFrom === unitTo) {
            result = tempValue;
        } else if (unitFrom === 'celsius') {
            if (unitTo === 'fahrenheit') {
                result = (tempValue * 9/5) + 32;
            } else if (unitTo === 'kelvin') {
                result = tempValue + 273.15;
            }
        } else if (unitFrom === 'fahrenheit') {
            if (unitTo === 'celsius') {
                result = (tempValue - 32) * 5/9;
            } else if (unitTo === 'kelvin') {
                result = (tempValue - 32) * 5/9 + 273.15;
            }
        } else if (unitFrom === 'kelvin') {
            if (unitTo === 'celsius') {
                result = tempValue - 273.15;
            } else if (unitTo === 'fahrenheit') {
                result = (tempValue - 273.15) * 9/5 + 32;
            }
        }

        // Format result to max 2 decimal places, remove trailing zeros
        const formattedResult = parseFloat(result.toFixed(2));
        let unitSymbol = '';
        
        switch(unitTo) {
            case 'celsius': unitSymbol = '°C'; break;
            case 'fahrenheit': unitSymbol = '°F'; break;
            case 'kelvin': unitSymbol = 'K'; break;
        }

        resultText.textContent = `${formattedResult} ${unitSymbol}`;
    };

    // Event listeners
    convertBtn.addEventListener('click', convert);

    // Allow "Enter" key to trigger conversion
    temperatureInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            convert();
        }
    });

    // Swap units functionality
    swapIcon.addEventListener('click', () => {
        const tempUnit = unitFromSelect.value;
        unitFromSelect.value = unitToSelect.value;
        unitToSelect.value = tempUnit;
        
        // Add a small rotation animation class re-trigger
        swapIcon.style.transform = "rotate(180deg)";
        setTimeout(() => {
            swapIcon.style.transform = "rotate(0deg)";
        }, 300);
        
        // If there is a value, convert it immediately after swap
        if (temperatureInput.value) {
            convert();
        }
    });
});
