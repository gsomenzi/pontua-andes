interface ProductStatisticData {
    cidades: any[];
    dias: any[];
    historico: {
        data: string;
        quantidade: number;
    }[];
    produto: any;
    resgates: any[];
    resgatesHoje: number;
    totalResgates: number;
    usuarios: any[];
}
