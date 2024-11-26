### Les Fonctions de Perte (Loss Functions) en Intelligence Artificielle

Les **fonctions de perte** sont des éléments clés dans la formation des modèles d'intelligence artificielle. Elles jouent un rôle essentiel dans l'optimisation, car elles mesurent l'écart entre les prédictions du modèle et les valeurs réelles (étiquettes). L'objectif du processus d'entraînement est de minimiser cette perte afin que le modèle devienne de plus en plus précis au fur et à mesure de son apprentissage.

---

### Qu'est-ce qu'une fonction de perte ?

Une **fonction de perte** est une mesure numérique qui représente la différence entre la prédiction d'un modèle et la valeur réelle (ou étiquette) à prédire. Elle guide le modèle pendant l'apprentissage en lui indiquant à quel point ses prédictions sont éloignées de la réalité. Le processus d'optimisation consiste à minimiser cette fonction en ajustant les paramètres du modèle (par exemple, les poids des neurones dans un réseau de neurones).

---

### Les Types de Fonctions de Perte

#### 1. **MSE (Mean Squared Error) ou Erreur Quadratique Moyenne**

La MSE est l'une des fonctions de perte les plus utilisées pour les problèmes de régression. Elle mesure l'écart quadratique moyen entre la prédiction du modèle et la valeur réelle.

**Formule :**

$$
MSE =\frac{\sum_{i=1}^n{(y_i - \bar{y_i})^2}}{n}
$$

Où :

- $y_i$ est la valeur réelle,
- $\bar{y_i}$ est la prédiction du modèle,
- $n$ est le nombre d'exemples dans le jeu de données.

**Cas d'utilisation :**

- Régression (prédiction de valeurs continues comme les prix de maisons, les températures, etc.).
- Les modèles de régression linéaire, de régression polynomiale, etc.

#### 2. **MAE (Mean Absolute Error) ou Erreur Absolue Moyenne**

La MAE est une autre fonction de perte populaire pour les problèmes de régression. Elle mesure la différence absolue moyenne entre les prédictions et les valeurs réelles.

**Formule :**

$$
MAE =\frac{\sum_{i=1}^n{\vert y_i - \bar{y_i}\vert}}{n}
$$

**Cas d'utilisation :**

- Régression (comme la MSE), mais plus robuste aux valeurs aberrantes (outliers).
- Prédiction de quantités physiques où les erreurs absolues sont plus significatives que les erreurs quadratiques.

#### 3. **Cross-Entropy (Entropie Croisée)**

La **cross-entropy** est utilisée pour les problèmes de classification. Elle mesure la différence entre la distribution des probabilités prédite par le modèle et la distribution réelle (souvent appelée "étiquette" ou "vérité terrain"). Elle est particulièrement adaptée pour les modèles de classification multiclasse.

**Formule :**

$$
Cross Entropy = -\sum_{i=1}^ny_i\log(\bar{y_i})
$$

Où :

- $y_i$ est l'étiquette réelle (souvent un vecteur one-hot),
- $\bar{y_i}$ est la probabilité prédite pour la classe .

**Cas d'utilisation :**

- Classification binaire ou multiclasse.
- Utilisée dans les réseaux de neurones pour la classification d'images, de textes, de sons, etc.

#### 4. **Hinge Loss (Perte de Hinge)**

La fonction de perte **hinge** est largement utilisée dans les **machines à vecteurs de support (SVM)**, surtout dans les problèmes de classification binaire. Elle favorise la séparation des classes tout en maintenant une marge maximale.

**Formule :**

$$
HingeLoss=\sum_{i=1}^n\max(0, 1-y_i.\bar{y_i})
$$

Où :

- $y_i$ est la valeur réelle (souvent -1 ou 1 pour la classification binaire),
- $\bar{y_i}$ est la prédiction du modèle.

**Cas d'utilisation :**

- Classification binaire avec SVM.
- Utilisée dans des tâches comme la reconnaissance de texte, la classification d'images.

#### 5. **Huber Loss**

La **perte de Huber** combine les avantages de la MSE et de la MAE. Elle est moins sensible aux outliers que la MSE, tout en étant différentiable, contrairement à la MAE.

**Formule :**

$$
HuberLoss = \sum_{i=1}^n\begin{cases}
\frac{1}{2}(y_i-\bar{y_i})^2 & si\ \vert y_i-\bar{y_i}\vert\leq\delta \\
\delta\vert y_i-\bar{y_i} \vert - \frac{1}{2}\delta^2 & sinon \\
\end{cases}
$$

Où :

- $\delta$ est un seuil qui détermine à partir de quel moment on passe de l'erreur quadratique à l'erreur absolue.

**Cas d'utilisation :**

- Régression où il y a des outliers, mais où ces derniers ne doivent pas être ignorés.
- Prédiction de données numériques dans des environnements avec des variations extrêmes.

#### 6. **Kullback-Leibler Divergence (KL Divergence)**

La **divergence de Kullback-Leibler** mesure à quel point une distribution de probabilité diffère d'une autre distribution . C'est une fonction de perte asymétrique, donc l'ordre des distributions importe.

**Formule :**

$$
D_{KL}(P\vert\vert Q) = \sum_i P(i)\log\frac{P(i)}{Q(i)}
$$

Où :

- $P(i)$ est la probabilité vraie,
- $Q(i)$ est la probabilité estimée.

**Cas d'utilisation :**

- Modèles génératifs comme les **auto-encodeurs variationnels** (VAE).
- Apprentissage par renforcement, génération de texte, etc.

#### 7. **Cosine Similarity Loss**

La **cosine similarity loss** est utilisée pour mesurer l'angle entre deux vecteurs dans un espace vectoriel. Elle est souvent utilisée pour des tâches où l'on compare la similarité entre des objets (par exemple, les phrases dans la compréhension du langage naturel).

**Formule :**

$$
Cosine\ Similarity = 1- \frac{A.B}{||A||.||B||}
$$

Où :

- $A$ et $B$ sont des vecteurs.

**Cas d'utilisation :**

- Comparaison de documents, phrases ou images dans les systèmes de recommandation ou la recherche sémantique.

#### 8. **Triplet Loss**

La **triplet loss** est utilisée pour apprendre une fonction de similarité, en particulier dans les tâches de **reconnaissance d'images**. Elle apprend à minimiser la distance entre des objets similaires et à maximiser la distance entre des objets dissemblables.

**Formule :**

$$
L=\max(d(a,p) - d(a,b) +\alpha, 0)
$$

Où :

- $d(a,p)$ est la distance entre l'ancre et un exemple positif,
- $d(a,b)$ est la distance entre l'ancre et un exemple négatif,
- $\alpha$ est un seuil qui assure que l'ancre et l'exemple négatif sont suffisamment séparés.

**Cas d'utilisation :**

- Apprentissage de la similarité dans la reconnaissance faciale, la reconnaissance d'objets, etc.

---

### Tableau Résumé des Fonctions de Perte

| Fonction de Perte     | Description                                                                    | Cas d'Utilisation                                         |
| --------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------- |
| **MSE**               | Mesure l'écart quadratique moyen entre les prédictions et les valeurs réelles. | Régression, prédiction de valeurs continues.              |
| **MAE**               | Mesure l'erreur absolue moyenne.                                               | Régression, robuste aux outliers.                         |
| **Cross-Entropy**     | Mesure la différence entre les probabilités prédites et les vérités terrain.   | Classification binaire ou multiclasse.                    |
| **Hinge Loss**        | Utilisée dans les SVM pour les problèmes de classification binaire.            | Classification binaire avec SVM.                          |
| **Huber Loss**        | Combine MSE et MAE, robuste aux outliers.                                      | Régression avec présence d'outliers.                      |
| **KL Divergence**     | Mesure la différence entre deux distributions de probabilité.                  | Modèles génératifs (VAE), apprentissage par renforcement. |
| **Cosine Similarity** | Mesure l'angle entre deux vecteurs.                                            | Recherche sémantique, recommandation.                     |
|                       |                                                                                |                                                           |
