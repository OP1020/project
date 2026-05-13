const supabaseUrl = 'https://yzkbddzthsqaqufyulvc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6a2JkZHp0aHNxYXF1Znl1bHZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwNTY0MzMsImV4cCI6MjA5MTYzMjQzM30.DZKGhNrhC0MHt_N_DdrmPKUn1-dnVyk8O_qg8gEZwPk'

const db = supabase.createClient(supabaseUrl, supabaseKey)

const form = document.getElementById('item-form')

// 1. LOAD ITEMS ON PAGE START
async function loadItems() {

    const {data, error} = await db
        .from('items')
        .select('*')

    if (error) {
        console.error(error)
        return
    }

    const container = document.getElementById('items-container')

    container.innerHTML = ''

    data.forEach(item => {

        const card = document.createElement('div')
        card.classList.add('item-card')

        card.innerHTML = `
  <h2>${item.item_name}</h2>
  <p>${item.item_location}</p>
`

        container.appendChild(card)
    })
}

// 2. FORM SUBMIT → ADD ITEM
form.addEventListener('submit', async (event) => {

    event.preventDefault()

    const itemName = document.getElementById('item-name').value
    const itemLocation = document.getElementById('item-location').value

    const {error} = await db
        .from('items')
        .insert([
            {
                item_name: itemName,
                item_location: itemLocation
            }
        ])

    if (error) {
        console.error(error)
        alert('Failed to add item')
        return
    }

    form.reset()
    loadItems()
})


loadItems();