import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import Router from 'next/router'

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["token", "user"]);
  const Logout = async () => {
    try {
      await del(`/logout/${cookies.user.id}`)
      if (response.ok) {
        Router.push('/')
      }
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <main>
      lll
      {/* <p>{cookies.token.id}</p> */}
    </main>
  )
}