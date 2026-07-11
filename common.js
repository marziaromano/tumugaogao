media:
  input: assets/images
  output: assets/images
  extensions: [jpg, jpeg, png, webp]

content:
  - name: prodotti
    label: Ceramiche
    type: file
    path: content/prodotti.json
    fields:
      - name: prodotti
        label: Pezzi
        type: object
        list: true
        fields:
          - name: title
            label: Titolo
            type: string
            required: true
          - name: price
            label: Prezzo (€)
            type: number
          - name: description
            label: Descrizione (facoltativa)
            type: text
          - name: sold
            label: Venduto
            type: boolean
            default: false
          - name: images
            label: Foto
            type: image
            list: true

  - name: sito
    label: Impostazioni sito
    type: file
    path: content/sito.json
    fields:
      - name: name
        label: Nome
        type: string
      - name: tagline
        label: Sottotitolo
        type: string
      - name: instagram
        label: Instagram (solo username, senza @)
        type: string
      - name: email
        label: Email per gli ordini (facoltativa)
        type: string
      - name: contactNote
        label: Testo della sezione Contatti
        type: text
      - name: buyNote
        label: Testo sotto ogni pezzo (es. "Per acquistare scrivi a")
        type: string
      - name: hero
        label: Foto dello slideshow iniziale
        type: image
        list: true
      - name: aboutIt
        label: About — italiano
        type: text
      - name: aboutEn
        label: About — english
        type: text
