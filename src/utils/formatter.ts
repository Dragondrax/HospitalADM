import moment from 'moment';

export function extractOnlyNumbers(value: string) {
    return value.replace(/\D/g, '');
};

export function formatCep(value: string) {
    value = extractOnlyNumbers(value);
    value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
    
    return value;
};

export function formatCpfCnpj(value: string) {
    value = extractOnlyNumbers(value);

    if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    } else {
        value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
    };
    
    return value;
};

export function formatPhone(value: string) {
    value = extractOnlyNumbers(value);

    if (value.length <= 10) {
        value = value.replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, '+$1($2)$3-$4')
    } else {
        value = value.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1($2)$3-$4')
    };
    
    return value;
};

export function formatRg(value: string) {
    value = value.replace(/-/g, '').replace(/\./g, '').toUpperCase();

    value = value.replace(/(.{2})(.{3})(.{3})(.{1})/, '$1.$2.$3-$4');

    return value;
};

export function formatDate(value: string, time: boolean = false) {
    if (time) {
        return moment(value).format('DD/MM/YYYY - HH:mm:ss');
    };
    
    return moment(value).format('DD/MM/YYYY');
};

export function formatMoney(value: string) {
    let valueNumber = Number(extractOnlyNumbers(value));
    const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valueNumber / 100);

    return String(currency);
};