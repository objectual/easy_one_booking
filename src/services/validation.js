




export const nameRegex = /^[a-zA-Z]+$/
export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
export const passwordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/
export const postalCodeRegex = /^\d{3}$/



export async function validate (value,regex,message){

    if(value == '' || value == null || String(()=>value.trim()) == ''  )
    {
        return await 'This field is requried'
    }
    else
    {
        if(await regex.test(value))
        {
            return await  null
        }

        else 
        {
            return await message
        }
      
    }
} 