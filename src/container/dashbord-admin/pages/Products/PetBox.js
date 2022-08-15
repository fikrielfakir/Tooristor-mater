import React from 'react'

const PetBox = ({pet}) => (
  <div className="pet">
    <div className="pet-name">{pet.name}</div>
  </div>
)

export default PetBox
