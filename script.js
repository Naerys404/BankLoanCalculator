document.getElementById('resultats').style.display='none';
    
document.getElementById('loading').style.display="none";


document.getElementById('formulaire').addEventListener('submit', function(e){
    
    document.getElementById('resultats').style.display='none';
    
    document.getElementById('loading').style.display="block";

    setTimeout(calculResultats,1500);
    e.preventDefault();
});

function calculResultats(e){
    
    const montant = document.getElementById('montant');
    const interets = document.getElementById('interets');
    const annees = document.getElementById('annees');

    const paiementMensuel = document.getElementById('paiement-mensuel');
    const montantTotal = document.getElementById('montant-total');
    const coutInterets = document.getElementById('montant-interets');

    const montantDecimal = parseFloat(montant.value);

    const calculInterets = parseFloat(interets.value)/100/12; //intéret en % par mois
    const calculPaiements = parseFloat(annees.value)*12;
    

    // CALCUL

    const x = Math.pow( 1 + calculInterets, calculPaiements); //20% = montant égal à 1.20 

    const mensuel = (montantDecimal) * x * calculInterets / (x-1);

    if(isFinite(mensuel)) {
        paiementMensuel.value = mensuel.toFixed(2);
        montantTotal.value = (mensuel * calculPaiements).toFixed(2);
        coutInterets.value = ((mensuel * calculPaiements) - montantDecimal).toFixed(2);

        document.getElementById('resultats').style.display='block';
    
        document.getElementById('loading').style.display="none";
    }
    else {
        showError('Merci de vérifier que votre saisie ne comporte que des nombres.');
    }
    

}

function showError(error){
    
    document.getElementById('resultats').style.display='none';
    
    document.getElementById('loading').style.display="none";

    const errorDiv = document.createElement('div');

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));


    card.insertBefore(errorDiv,heading); //1er param : l'element qu'on insere, 2eme param l'objet de référence du placement



    setTimeout(clearError, 4000);

}

function clearError(){
    document.querySelector('.alert').remove();
}