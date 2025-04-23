//Quando usamos Typescritp, isso serve para podermos alterar uma tipagem, a qual queremos adicionar uma nova variável
//Não esquecer de ativar a opção typeRoots no arquivo de configuração do Typescript, e adicionar o caminho da pasta em que estão as novas dipagens

declare namespace Express {
  export interface Request {
    user_id: string;
    file: Express.Multer.File;
  }
}
