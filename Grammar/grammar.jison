/**
 * Grammar to create AST
 */
/* NOTE
To compile grammar.jison add in grammar.js:
  const {Terminal} = require("../Generator/Terminal.js")
  const {UnaryOperators} = require("../Generator/UnaryOperators.js")
  const {DoubleOperators} = require("../Generator/DoubleOperators.js")
  let id =0;  
*/
/* Lexic Definition */
%lex

%options case-insensitive

%%

"("                 return 'LPAR';
")"                 return 'RPAR';
"["                 return 'LSB';
"]"                 return 'RSB';

"+"                 return 'PLUS';
"*"                 return 'TIMES';
"|"                 return 'OR';
"?"                 return 'QM';
"."                 return 'AND';
"#"                 return 'END';

/* blank spaces */
[ \r\t]+            {}
\n                  {}

[0-9]                return 'NUMBER';
[a-zA-Z]+            return 'ID';

<<EOF>>            return 'EOF';

.                  { console.error('Lexic Error: ' + yytext + ', at line: ' + yylloc.first_line + ', and column: ' + yylloc.first_column); }
/lex

/* Association and Precedence */

%left 'OR' 
%left 'AND'  
%left 'PLUS' 'TIMES'
%left 'QM'

%start ini

%% /* Syntax Grammar */

ini
	: instrucciones EOF { return $1}
;

instrucciones
	: instrucciones instruccion     { $1.push($2); $$ = $1; id=0;}
	| instruccion                   { $$ = [$1]; id=0;}
	| error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

instruccion
	: LSB  expresion RSB END {
    { id++;
      $$ = new DoubleOperators($2,"AND",new Terminal("#",id));}
	}
;

expresion
	: expresion OR expresion        { $$ = new DoubleOperators($1,"OR",$3)}
	| expresion AND expresion       { $$ = new DoubleOperators($1,"AND",$3)} 
  | expresion PLUS                { $$ = new UnaryOperators($1,"+")}
	| expresion TIMES               { $$ = new UnaryOperators($1,"*")}
	| expresion QM                  { $$ = new UnaryOperators($1,"?")} 
	| LPAR expresion RPAR           { $$ = $2}
	| ID                            { id++; $$ =  new Terminal($1,id);}
	| NUMBER                        { id++; $$ = new Terminal($1,id); } 
;
