import React, { useState, useEffect } from 'react'
import ButtonBread from '../../UI/ButtonBread'
import feedbackPng from '../../../assets/png/feedback/feedback.png'
import FormSubmitSuccess from '../../modals/FormSubmitSuccess'
import { validateInputString } from '../../../helpers/validateInputString'

export default function Feedback() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setComment(event.target.value)

  const handleCloseModal = () => setIsModalOpen(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateInputString(username) || !validateInputString(email) || !validateInputString(comment)) {
      alert('Invalid input, please check how you entered your data')
      return
    } // Делаем проверку чтобы не закидывали файлы напимер

    const data = {
      username: username,
      email: email,
      comment: comment
    }

    console.log('Form submitted')
    console.log(data)
    setUsername('')
    setEmail('')
    setComment('')
    setIsModalOpen(true)
  }

  return (
    <section className='feedback flex flex-col mx-auto bg-white dark:bg-transparent sm:dark:bg-[#F3F3F3] sm:shadow-[0_0_20px_rgba(114,114,114,0.1)] rounded-[15px] max-w-[1040px] w-full p-[10px_20px] sm:p-[50px_75px] mt-[70px] sm:mt-[140px]'>
      <h3 className='font-sans dark:text-white sm:dark:text-black-80 sm:text-black-80 font-medium text-[30px] sm:text-[34px] sm:text-left text-center'>
        Свяжитесь с нами
      </h3>
      <div className='flex flex-col md:flex-row justify-between w-full gap-[1rem] md:gap-[2.25rem] mt-[1.094rem] sm:mt-[2.188rem]'>
        <div className='flex flex-col md:w-[55%]'>
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <label htmlFor='name' className='font-Rubic hidden sm:block'>ФИО</label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder={isSmallScreen ? 'ФИО' : 'Иванов Иван Иванович'}
              className='border dark:border-white sm:dark:border-black-80 border-black-80 px-[1.563rem] py-[1.094rem] rounded-xl mt-[1.094rem] sm:mt-[0.625rem] dark:bg-transparent sm:dark:bg-[#F3F3F3] dark:text-white  sm:dark:text-black-80'
              value={username}
              onChange={handleUsernameChange}
            />
            <label htmlFor='email' className='mt-[1.563rem] font-Rubic hidden sm:block'>Email</label>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              placeholder={isSmallScreen ? 'Email' : 'Адрес эл почть'}
              className='border dark:border-white sm:dark:border-black-80 border-black-80 px-[1.563rem] py-[1.094rem] rounded-xl mt-[1.094rem] sm:mt-[0.625rem] dark:bg-transparent sm:dark:bg-[#F3F3F3] dark:text-white  sm:dark:text-black-80'
              value={email}
              onChange={handleEmailChange} />
            <label htmlFor='comment' className='mt-[1.563rem] font-Rubic hidden sm:block'>Коментарий</label>
            <textarea
              id='comment'
              name='comment'
              rows={2}
              placeholder={isSmallScreen ? 'Коментарий' : ''}
              className='border dark:border-white sm:dark:border-black-80 border-black-80 px-[1.563rem] py-[1.094rem] rounded-xl mt-[1.094rem] sm:mt-[0.625rem] dark:bg-transparent sm:dark:bg-[#F3F3F3] dark:text-white  sm:dark:text-black-80'
              value={comment}
              onChange={handleCommentChange}
            />
            <ButtonBread
              name='Отправить'
              width="w-full"
              type='submit'
              className='mt-[0.625rem]' />
          </form>
          <p className='mt-[0.625rem] text-center text-[12px] font-Rubic text-[#7B8694]'>Нажимая на кнопку «Отправить», вы даете согласие на обработку персональных данных</p>
        </div>

        <div className='md:w-[45%]'>
          <img src={feedbackPng} alt="feedback cat" /> {/* TODO change to svg */}
        </div>
      </div>

      <FormSubmitSuccess isOpen={isModalOpen} closeModal={handleCloseModal} />
    </section>
  )
}