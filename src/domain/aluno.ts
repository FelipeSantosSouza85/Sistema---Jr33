import { PagamentoProvider } from "../providers/pagamentos/pagamento-service";

export class Aluno{
    public nome: string;
    public telefoneFixo: string;
    public telefoneCelular: string;
    public logradouro: string;
    public bairro: string;
    public cidade: string;
    public estado: string;
    public cep: string;
    public cpf: string;
    public rg: string;
    public dataNascimento: string = new Date().toISOString();
    public celular: string;
    public email:string;
    public diaVencMensalidade: string;
    public tipoMatricula: string;
    public observacao: string;
    public pagamentos: PagamentoProvider[];
    public dataCadastro: Date = new Date();
}