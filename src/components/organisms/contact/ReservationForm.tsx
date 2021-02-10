interface Props {
  name: string
  datetime: string
}

const ReservationForm: React.FC<Props> = ({ name, datetime }) => {
  return (
    <div>
      <table>
        <tr>
          <th>お名前</th>
          <td>{name}</td>
        </tr>
        <tr>
          <th>予約日時</th>
          <td>{datetime}</td>
        </tr>
      </table>
    </div>
  )
}

export default ReservationForm
