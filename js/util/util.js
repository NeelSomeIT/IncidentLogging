Util = (function () {
    function navigateTo(currentScreen, nextScreen) {
        $('#btn' + currentScreen + 'To' + nextScreen).click();
        initValidation(nextScreen);

        setTimeout(function () {
            $('#div' + currentScreen).html('');
        }, 300);
    }

    function initValidation(form) {
        $(form).validate({
            errorPlacement: function (error, element) {
                var elementType = $(element).prop('nodeName');
                var groupElement = (elementType === 'SELECT') ? element.parent() : element.parent().parent();
                error.insertAfter(groupElement);
            }
        });
    }

    function findById(source, key, id) {
        for (var i = 0; i < source.length; i++) {
            if (source[i][key] === id) {
                return source[i];
            }
        }
        return null;
    }

    function findIndexById(source, key, id) {
        for (var i = 0; i < source.length; i++) {
            if (source[i][key] === id) {
                return i;
            }
        }
        return null;
    }

    function findAllById(source, key, id) {
        var list = [];

        for (var i = 0; i < source.length; i++) {
            if (source[i][key] === id) {
                list.push(source[i]);
            }
        }
        return list;
    }

    function findInList(source, id) {
        for (var i = 0; i < source.length; i++) {
            if (source[i] === id) {
                return source[i];
            }
        }
        return null;
    }

    function startLoader() {
        Swal.fire({
            title: '',
            width: '100px',
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });
    }

    function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
            console.log(e);
        }
    }

    function findArrayDiff(a1, a2) {
        var a = [], diff = [];
        for (i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }

        for (i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }

        for (var k in a) {
            diff.push(k);
        }

        return diff;
    }

    function stopLoader() {
        Swal.close();
    }

    return {
        navigateTo: navigateTo,
        initValidation: initValidation,
        findById: findById,
        findIndexById: findIndexById,
        findAllById: findAllById,
        findInList: findInList,
        formatMoney: formatMoney,
        startLoader: startLoader,
        stopLoader: stopLoader,
        findArrayDiff: findArrayDiff

    };
}());