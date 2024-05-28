import Modais from "../../classes/Modais.js";

export default function sobre(){
  void new Modais(
    '<i class="bi bi-info-circle me-2"></i>Sobre',
    `
    <h2>Sobre o App</h2>
<p>O app destina-se a pessoas que desejam monitorar seu desempenho.</p>
<p>Mostramos de forma visual seu pregresso.</p>
<p>Para praticar você precisará de uma Gyro Ball.</p>
<p>Deixe o algorítimo definir a velocidade e todos os outros cálculos pelo som.</p>
<h2>Sobre o Gyro Ball</h2>
<p>O Gyro Ball é um dispositivo de exercícios pequeno, mas poderoso, projetado para força e reabilitação.</p>
<img class="img-fluid rounded-5 mb-3" src="https://cdn.shopify.com/s/files/1/0648/8408/0867/files/gif1_480x480.gif" alt="Usando um Gyro Ball" />
<p>A resistência gerada pelo GyroBall é chamada de 'resistência isométrica'. A resistência isométrica envolve uma porcentagem muito maior de fibras musculares do que o treinamento isotônico padrão (por exemplo, pesos livres) em um período mais curto. Também não tem impacto, o que o torna uma forma de fortalecimento que exerce ZERO impacto em suas juntas enquanto você se exercita. É um treinamento de peso sem nenhum risco de lesão.</p>
<p>Use o Gyro Ball se você quiser melhorar o seu pulso, aderência e força do braço.</p>
    `
  ).exibe();
}