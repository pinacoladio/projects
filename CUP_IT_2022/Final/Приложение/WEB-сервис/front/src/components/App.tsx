import React, { useState, useEffect } from 'react'
import {
  Typography,
  Container,
  AppBar,
  Toolbar,
  Box,
  Paper,
  Stack,
  TextField,
  IconButton,
  Button,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Skeleton,
} from '@mui/material'
import { debounce } from './Hooks'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { styled } from '@mui/material/styles'
import DateTimePicker from '@mui/lab/DateTimePicker'
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

const formDateTimeFromTimestamp = (timestamp: number): string => {
  const datetime = new Date(timestamp)
  return `${datetime.getDate().toString().padStart(2, '0')}.${(
    datetime.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}.${datetime.getFullYear()}, ${datetime
    .getHours()
    .toString()
    .padStart(2, '0')}:${datetime.getMinutes().toString().padStart(2, '0')}`
}

type TableData = {
  date_from: number
  date_to: number
  service: string
  subdivisions: { [key: string]: number }
}

const StackCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gridGap: theme.spacing(2),
}))

const StackCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(4),
  fontWeight: 'bolder',
  color: theme.palette.primary.main,
}))

const StackCardSubTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(2.5),
}))

const StackCardText = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(2),
}))

type SelectedService = {
  service: string
  dateFrom: number
  dateTo: number
}

const App: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    []
  )
  const [avaliableServices, setAvaliableServices] = useState<
    Map<string, boolean>
  >(new Map())
  const [serviceInput, setServiceInput] = useState<SelectedService>({
    service: '',
    dateFrom: Date.now(),
    dateTo: Date.now(),
  })

  const [lossData, setLossData] = useState<TableData[]>([])

  const [isAvaliableServicesLoading, setIsAvaliableServicesLoading] =
    useState<boolean>(false)
  const [isLossDataLoading, setIsLossDataLoading] = useState<boolean>(false)

  const loadAvaliableServices = () => {
    setIsAvaliableServicesLoading(true)
    fetch('http://127.0.0.1:8000/api/avaliable', { method: 'GET' })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error fetching avaliable services')
        }
        return res.json() as Promise<string[]>
      })
      .then((services) => {
        setAvaliableServices(
          services.reduce((acc, cur) => acc.set(cur, true), new Map())
        )
        setIsAvaliableServicesLoading(false)
      })
      .catch((err) => {
        setIsAvaliableServicesLoading(false)
      })
  }

  const loadLossData = debounce(
    () => {
      setIsLossDataLoading(true)
      fetch('http://127.0.0.1:8000/api/loss', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(
          selectedServices.map(({ dateFrom, dateTo, service }) => ({
            date_from: dateFrom,
            date_to: dateTo,
            service,
          }))
        ),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Error fetching services losses')
          }
          return res.json() as Promise<TableData[]>
        })
        .then((losses) => {
          setLossData(losses)
          setIsLossDataLoading(false)
        })
        .catch((err) => {
          setIsLossDataLoading(false)
        })
    },
    200,
    true
  )

  const addSelectedService = () => {
    if (!serviceInput.service) {
      return
    }

    setSelectedServices((prev) => [
      ...prev,
      {
        service: serviceInput.service,
        dateFrom: serviceInput.dateFrom,
        dateTo: serviceInput.dateTo,
      },
    ])
    setAvaliableServices((prev) => {
      prev.delete(serviceInput.service)
      return prev
    })

    setServiceInput({
      service: '',
      dateFrom: Date.now(),
      dateTo: Date.now(),
    })
  }

  const deleteSelectedService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.filter(({ service }) => service !== serviceName)
    )
    setAvaliableServices((prev) => prev.set(serviceName, true))
  }

  const handleInputServiceChange = (event: SelectChangeEvent) => {
    setServiceInput((prev) => ({
      ...prev,
      service: event.target.value,
    }))
  }

  const handleInputDateFromChange = (date: string | null) => {
    if (date) {
      setServiceInput((prev) => ({
        ...prev,
        dateFrom: new Date(date).getTime(),
      }))
    }
  }

  const handleInputDateToChange = (date: string | null) => {
    if (date) {
      setServiceInput((prev) => ({
        ...prev,
        dateTo: new Date(date).getTime(),
      }))
    }
  }

  useEffect(() => {
    loadAvaliableServices()
  }, [])

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h4"
              component="div"
              sx={{
                mr: 2,
                color: 'background.default',
                display: { md: 'flex' },
                fontWeight: 'bolder',
              }}
            >
              Severstal
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container
        maxWidth="md"
        sx={{
          marginTop: (theme) => theme.spacing(2),
          marginBottom: (theme) => theme.spacing(2),
        }}
      >
        {isAvaliableServicesLoading ? (
          <Stack spacing={2}>
            <Skeleton variant="rectangular" width="100%" height={88} />
            <Skeleton variant="rectangular" width="100%" height={88} />
            <Skeleton variant="rectangular" width="100%" height={88} />
          </Stack>
        ) : (
          <>
            <Box sx={{ width: '100%' }}>
              <Stack spacing={2}>
                {selectedServices.map(({ service, dateFrom, dateTo }) => (
                  <StackCard
                    sx={{
                      gridGap: (theme) => theme.spacing(4),
                    }}
                    key={`stackItem-${service}`}
                  >
                    <StackCardTitle>{service}</StackCardTitle>
                    <StackCardText>
                      <StackCardSubTitle>From date:</StackCardSubTitle>{' '}
                      {formDateTimeFromTimestamp(dateFrom)}
                    </StackCardText>
                    <StackCardText>
                      <StackCardSubTitle>To date:</StackCardSubTitle>
                      {formDateTimeFromTimestamp(dateTo)}
                    </StackCardText>
                    <IconButton
                      sx={{
                        marginLeft: 'auto',
                      }}
                      onClick={() => deleteSelectedService(service)}
                    >
                      <DeleteIcon
                        sx={{
                          fontSize: (theme) => theme.spacing(4),
                          color: 'secondary.main',
                        }}
                      />
                    </IconButton>
                  </StackCard>
                ))}
                {avaliableServices.size === 0 ? (
                  <StackCardTitle sx={{ textAlign: 'center' }}>
                    Не удалось загрузить доступные сервисы
                  </StackCardTitle>
                ) : (
                  <StackCard>
                    <FormControl sx={{ minWidth: 120 }}>
                      <InputLabel id="service-selector-label">
                        Service
                      </InputLabel>
                      <Select
                        labelId="service-selector-label"
                        id="service-selector"
                        data-name="service"
                        value={serviceInput.service}
                        label="Service"
                        onChange={handleInputServiceChange}
                      >
                        {Array.from(avaliableServices.entries()).map(
                          ([avaliableService, isAvaliable]) =>
                            !isAvaliable ? (
                              ''
                            ) : (
                              <MenuItem
                                key={`selectItem-${avaliableService}`}
                                value={avaliableService}
                              >
                                {avaliableService}
                              </MenuItem>
                            )
                        )}
                      </Select>
                    </FormControl>
                    <DesktopDateTimePicker
                      label="Date from"
                      ampm={false}
                      data-name="date_from"
                      mask="__.__.____, __:__"
                      inputFormat="DD.MM.YYYY, HH:mm"
                      value={serviceInput.dateFrom}
                      onChange={handleInputDateFromChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <DateTimePicker
                      label="Date to"
                      data-name="date_to"
                      ampm={false}
                      mask="__.__.____, __:__"
                      inputFormat="DD.MM.YYYY, HH:mm"
                      value={serviceInput.dateTo}
                      onChange={handleInputDateToChange}
                      renderInput={(params) => <TextField {...params} />}
                    />

                    {serviceInput.service && (
                      <IconButton
                        onClick={addSelectedService}
                        disabled={!serviceInput.service}
                        sx={{
                          marginLeft: 'auto',
                        }}
                      >
                        <CheckCircleIcon
                          sx={{
                            fontSize: (theme) => theme.spacing(4),
                            color: 'primary.main',
                          }}
                        />
                      </IconButton>
                    )}
                  </StackCard>
                )}
                {selectedServices.length !== 0 && (
                  <StackCard
                    sx={{
                      padding: 0,
                    }}
                  >
                    <Button
                      onClick={loadLossData}
                      fullWidth
                      variant="contained"
                    >
                      Search
                    </Button>
                  </StackCard>
                )}
              </Stack>
            </Box>
            {isLossDataLoading ? (
              <Stack spacing={2}>
                <Skeleton variant="rectangular" width="100%" height={164} />
                <Skeleton variant="rectangular" width="100%" height={164} />
              </Stack>
            ) : (
              <>
                {lossData.map((tableData) => (
                  <TableContainer
                    sx={{
                      width: '100%',
                      borderRadius: '4px',
                      marginTop: (theme) => theme.spacing(2),
                    }}
                    component={Box}
                  >
                    <StackCardTitle>{tableData.service}</StackCardTitle>
                    <Table>
                      <TableHead
                        sx={{
                          th: { borderColor: 'secondary.light' },
                        }}
                      >
                        <TableRow
                          sx={{
                            backgroundColor: 'secondary.main',
                          }}
                        >
                          <TableCell
                            sx={{
                              fontSize: (theme) => theme.spacing(2.5),
                              fontWeight: 'bolder',
                              color: '#fff',
                            }}
                          >
                            Sybdevision
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: (theme) => theme.spacing(2.5),
                              fontWeight: 'bolder',
                              color: '#fff',
                            }}
                            align="right"
                          >
                            Loss
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(tableData.subdivisions).map(
                          ([subdividionName, subdividionLoss], rowIndex) => (
                            <TableRow
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                                'th, td': {
                                  borderColor: 'secondary.light',
                                  color: '#fff',
                                  fontSize: (theme) => theme.spacing(2),
                                  fontWeight: 'bold',
                                },
                                backgroundColor:
                                  rowIndex % 2 == 0
                                    ? 'secondary.light'
                                    : 'primary.main',
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {subdividionName}
                              </TableCell>
                              <TableCell align="right">
                                {subdividionLoss}
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ))}
              </>
            )}
          </>
        )}
      </Container>
    </>
  )
}

export default App
