
export class Pagamento {
    public nomeAluno: string;
    public cpfAluno: string;
    public tipoPagamento: string;
    public diaPagamento: string;
    public mesPagamento: string;
    public anoPagamento: number = new Date().getFullYear();
    public valorPagamento: number;
    public responsavelPagamento: string;
    public dataPagamento: string = new Date().toISOString();
    public formaPagamento: string;
    public tipoProduto: string;
    public descricaoProduto: String;
    
}